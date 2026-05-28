export type QuestionType = {
  type: string;

  numberOfQuestions: number;

  marks: number;
};

export type AssignmentFormData = {
  uploadedFileUrl: string;
  title : string,
  dueDate: string;

  additionalInstructions: string;

  questionTypes: QuestionType[];
};