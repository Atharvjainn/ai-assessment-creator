import mongoose from "mongoose";

export const questionTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },

  numberOfQuestions: {
    type: Number,
    required: true,
    min: 1,
  },

  marks: {
    type: Number,
    required: true,
    min: 1,
  },
});

const generatedQuestionSchema = new mongoose.Schema({
  text: String,

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },

  marks: Number,
  answer: String,
});

const sectionSchema = new mongoose.Schema({
  label : String,

  title: String,

  instruction: String,

  questions: [generatedQuestionSchema],
});

const assignmentSchema = new mongoose.Schema(
  {
    uploadedFileUrl: String,

    dueDate: {
      type: Date,
      required: true,
    },

    additionalInstructions: String,

    questionTypes: [questionTypeSchema],

    totalQuestions: Number,

    totalMarks: Number,

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
      ],

      default: "pending",
    },

    generatedPaper: {
      sections: [sectionSchema],
    },
  },

  {
    timestamps: true,
  }
);

export const Assignment = mongoose.model("Assignment",assignmentSchema);