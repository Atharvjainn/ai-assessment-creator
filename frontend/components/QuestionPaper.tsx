"use client";

type Question = {
  text: string;
  difficulty: "easy" | "medium" | "hard";
  marks: number;
  answer: string;
};

type Section = {
  label: string;
  title: string;
  instruction: string;
  questions: Question[];
};

type Props = {
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maximumMarks: number;
  sections: Section[];
};

export default function QuestionPaper({
  schoolName,
  subject,
  className,
  timeAllowed,
  maximumMarks,
  sections,
}: Props) {
  return (
    <div className="w-full min-h-screen bg-[#E5E5E5] p-4 md:p-6">
      {/* AI Banner */}
      <div className="w-full rounded-[20px] md:rounded-[28px] bg-[#1F1F1F] p-4 md:p-6 text-white shadow-[0_20px_40px_rgba(0,0,0,0.18)]">
        <h2 className="text-[15px] md:text-[18px] font-semibold leading-[28px] md:leading-[32px]">
          Certainly, Lakshya! Here are customized Question
          Paper for your CBSE Grade 8 Science classes on the
          NCERT chapters:
        </h2>

        <button className="mt-5 h-[40px] md:h-[42px] px-5 rounded-full bg-white text-[#1F1F1F] text-[13px] md:text-[14px] font-medium hover:opacity-90 transition">
          Download as PDF
        </button>
      </div>

      {/* Paper */}
      <div className="mt-6 w-full rounded-[20px] md:rounded-[32px] bg-white px-5 md:px-12 py-8 md:py-14 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        {/* School Header */}
        <div className="text-center">
          <h1 className="text-[26px] md:text-[42px] font-bold text-[#2B2B2B]">
            {schoolName}
          </h1>

          <p className="mt-3 text-[18px] md:text-[28px] font-medium text-[#2D2D2D]">
            Subject: {subject}
          </p>

          <p className="mt-2 text-[18px] md:text-[28px] font-medium text-[#2D2D2D]">
            Class: {className}
          </p>
        </div>

        {/* Meta Info */}
        <div className="mt-8 md:mt-14 flex items-center justify-between text-[14px] md:text-[20px] text-[#2D2D2D] gap-4">
          <p>Time Allowed: {timeAllowed}</p>

          <p>Maximum Marks: {maximumMarks}</p>
        </div>

        {/* Instruction */}
        <p className="mt-6 md:mt-10 text-[14px] md:text-[18px] text-[#2D2D2D]">
          All questions are compulsory unless stated
          otherwise.
        </p>

        {/* Student Details */}
        <div className="mt-8 md:mt-12 space-y-3 text-[14px] md:text-[18px] text-[#2D2D2D]">
          <p>Name: __________________</p>

          <p>Roll Number: __________________</p>

          <p>
            Class: {className} Section:
            ________
          </p>
        </div>

        {/* Sections */}
        <div className="mt-14 md:mt-20">
          {sections.map(
            (section, sectionIndex) => (
              <div
                key={section.label}
                className="mb-14 md:mb-20"
              >
                {/* Section Heading */}
                <div className="text-center">
                  <h2 className="text-[24px] md:text-[38px] font-semibold text-[#2D2D2D]">
                    Section {section.label}
                  </h2>

                  <h3 className="mt-5 md:mt-8 text-[17px] md:text-[24px] font-medium text-[#2D2D2D]">
                    {section.title}
                  </h3>

                  <p className="mt-2 italic text-[13px] md:text-[18px] text-[#777777]">
                    {section.instruction}
                  </p>
                </div>

                {/* Questions */}
                <div className="mt-8 md:mt-12 space-y-5 md:space-y-8">
                  {section.questions.map(
                    (
                      question,
                      questionIndex
                    ) => (
                      <div
                        key={`${section.label}-${questionIndex}`}
                        className="flex gap-4 text-[14px] md:text-[18px] leading-[26px] md:leading-[34px] text-[#2D2D2D]"
                      >
                        {/* Number */}
                        <span className="font-medium shrink-0">
                          {questionIndex + 1}.
                        </span>

                        {/* Question */}
                        <p>
                          [{question.difficulty}]{" "}
                          {question.text} [
                          {question.marks} Marks]
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="mt-14 md:mt-20">
          <p className="text-[15px] md:text-[18px] font-semibold text-[#2D2D2D]">
            End of Question Paper
          </p>
        </div>

        {/* Answer Key */}
        <div className="mt-14 md:mt-20">
          <h2 className="text-[24px] md:text-[34px] font-semibold text-[#2D2D2D]">
            Answer Key:
          </h2>

          <div className="mt-8 md:mt-10 space-y-5 md:space-y-8">
            {sections.flatMap((section) =>
              section.questions.map(
                (question, index) => (
                  <div
                    key={`${section.label}-${index}`}
                    className="text-[14px] md:text-[17px] leading-[26px] md:leading-[34px] text-[#2D2D2D]"
                  >
                    <span className="font-medium">
                      {index + 1}.
                    </span>{" "}
                    {question.answer}
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}