import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { GEMINI_API_KEY } from "../config/env.js";
import type { QuestionType,GeneratedQuestion,Section,GeneratedPaper } from "./types.js";
import { Assignment } from "../models/assessment_models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// --- Prompt Builder ---
const buildPrompt = (questionTypes: QuestionType[]): string => {
  const sectionInstructions = questionTypes
    .map((qt, i) => {
      const label = String.fromCharCode(65 + i);
      return `Section ${label} - ${qt.type}: Generate exactly ${qt.numberOfQuestions} questions, each carrying ${qt.marks} mark(s).`;
    })
    .join("\n");

  return `
You are an expert teacher. Based on the uploaded study material, generate a structured question paper.

INSTRUCTIONS:
${sectionInstructions}

RULES:
- Each question must have difficulty: "easy", "medium", or "hard"
- Mix difficulties within each section
- Every question must have a clean answer
- Respond ONLY with valid JSON, no extra text, no markdown fences

JSON structure:
{
  "sections": [
    {
      "label": "A",
      "title": "Short Answer Questions",
      "instruction": "Attempt all questions. Each question carries 2 marks",
      "questions": [
        {
          "text": "...",
          "difficulty": "easy",
          "marks": 2,
          "answer": "..."
        }
      ]
    }
  ],
}
`;
};

// --- Main ---
export const generate = async (assignmentId : string) => {
  const assignment = await Assignment.findById(assignmentId);
  const questionTypes = assignment?.questionTypes ?? []
  const totalQuestions = questionTypes.reduce((sum, qt) => sum + qt.numberOfQuestions, 0);
  const totalMarks = questionTypes.reduce((sum, qt) => sum + qt.numberOfQuestions * qt.marks, 0);
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  const fileURL = assignment?.uploadedFileUrl;
  console.log("FILE URL FROM DB:", fileURL); // 👈 add this
  if (!fileURL) {
    throw new Error("No uploaded file URL found on assignment");
  }
  const fileResponse = await fetch(fileURL!, {
  method: "GET",
  headers: { "User-Agent": "Mozilla/5.0" },
});
if (!fileResponse.ok) {
  throw new Error(
    `Fetch failed: ${fileResponse.status} ${fileResponse.statusText} — URL: ${fileURL}`
  );
}
  if (!fileResponse.ok) {
    throw new Error(
      "Failed to fetch uploaded file"
    );
  }
  const contentType = fileResponse.headers.get(
                        "content-type"
                        ) || "application/pdf";

  const arrayBuffer = await fileResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64File = buffer.toString("base64");

  const prompt = buildPrompt(questionTypes);

  console.log("Generating question paper...\n");

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: contentType,
        data: base64File,
      },
    },
    { text: prompt },
  ]);

  const rawText = result.response.text();

  // parse
  let paper: GeneratedPaper;
  try {
    const clean = rawText.replace(/```json|```/g, "").trim();
    paper = JSON.parse(clean);
  } catch (err) {
    await Assignment.findByIdAndUpdate(assignmentId, { status: "failed" });
    throw new Error(`Failed to parse Gemini response: ${rawText}`);
  }


  await Assignment.findByIdAndUpdate(assignmentId, {
    status: "completed",
    totalQuestions: totalQuestions,
    totalMarks: totalMarks,
    generatedPaper: {
      sections: paper.sections.map((section) => ({
        label: section.label,
        title: section.title,
        instruction: section.instruction,
        questions: section.questions.map((q) => ({
          text: q.text,
          difficulty: q.difficulty,
          marks: q.marks,
          answer: q.answer,
        })),
      })),
    },
  });

};

// generate(assignmentId).catch(console.error);