export interface QuestionType {
  type: string;
  numberOfQuestions: number;
  marks: number;
}

export interface GeneratedQuestion {
  text: string;
  difficulty: "easy" | "medium" | "hard";
  marks: number;
  answer: string;
}

export interface Section {
  label: string;
  title: string;
  instruction: string;
  questions: GeneratedQuestion[];
}

export interface GeneratedPaper {
  sections: Section[];
  totalQuestions: number;
  totalMarks: number;
}