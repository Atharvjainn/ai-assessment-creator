"use client";

import {
  CalendarDays,
  ChevronDown,
  Minus,
  Plus,
  Mic,
} from "lucide-react";

import UploadBox from "./UploadBox";

const questionTypes = [
  {
    label: "Multiple Choice Questions",
    questions: 4,
    marks: 1,
  },
  {
    label: "Short Questions",
    questions: 3,
    marks: 2,
  },
  {
    label: "Diagram/Graph-Based Questions",
    questions: 5,
    marks: 5,
  },
  {
    label: "Numerical Problems",
    questions: 5,
    marks: 5,
  },
];

export default function AssignmentForm() {
  return (
    <div className="w-full max-w-[980px] rounded-[30px] bg-[#F5F5F5] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
      {/* Heading */}
      <div>
        <h2 className="text-[28px] font-semibold text-[#2D2D2D]">
          Assignment Details
        </h2>

        <p className="mt-1 text-[#8A8A8A] text-[14px]">
          Basic information about your assignment
        </p>
      </div>

      {/* Upload */}
      <div className="mt-8">
        <UploadBox />
      </div>

      {/* Upload Helper */}
      <p className="mt-5 text-center text-[14px] text-[#8A8A8A]">
        Upload images of your preferred document/image
      </p>

      {/* Due Date */}
      <div className="mt-8">
        <label className="text-[15px] font-medium text-[#2F2F2F]">
          Due Date
        </label>

        <div className="mt-3 h-[54px] rounded-full border border-[#E1E1E1] bg-[#FAFAFA] px-5 flex items-center justify-between">
          <span className="text-[#B1B1B1] text-[15px]">
            DD-MM-YYYY
          </span>

          <CalendarDays
            size={20}
            className="text-[#6D6D6D]"
          />
        </div>
      </div>

      {/* Header */}
      <div className="mt-10 grid grid-cols-[1fr_120px_120px] gap-5 px-2">
        <p className="text-[14px] font-medium text-[#2F2F2F]">
          Question Type
        </p>

        <p className="text-[14px] font-medium text-[#2F2F2F] text-center">
          No. of Questions
        </p>

        <p className="text-[14px] font-medium text-[#2F2F2F] text-center">
          Marks
        </p>
      </div>

      {/* Rows */}
      <div className="mt-4 flex flex-col gap-4">
        {questionTypes.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_120px_120px] gap-5 items-center"
          >
            {/* Dropdown */}
            <div className="h-[54px] rounded-full bg-[#FAFAFA] border border-[#E8E8E8] px-5 flex items-center justify-between">
              <span className="text-[15px] text-[#2D2D2D]">
                {item.label}
              </span>

              <ChevronDown
                size={18}
                className="text-[#6D6D6D]"
              />
            </div>

            {/* Question Counter */}
            <div className="h-[54px] rounded-full bg-[#FAFAFA] border border-[#E8E8E8] px-4 flex items-center justify-between">
              <button>
                <Minus
                  size={16}
                  className="text-[#B0B0B0]"
                />
              </button>

              <span className="text-[15px] text-[#2D2D2D]">
                {item.questions}
              </span>

              <button>
                <Plus
                  size={16}
                  className="text-[#B0B0B0]"
                />
              </button>
            </div>

            {/* Marks Counter */}
            <div className="h-[54px] rounded-full bg-[#FAFAFA] border border-[#E8E8E8] px-4 flex items-center justify-between">
              <button>
                <Minus
                  size={16}
                  className="text-[#B0B0B0]"
                />
              </button>

              <span className="text-[15px] text-[#2D2D2D]">
                {item.marks}
              </span>

              <button>
                <Plus
                  size={16}
                  className="text-[#B0B0B0]"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Type */}
      <button className="mt-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#2D2D2D] flex items-center justify-center">
          <Plus size={16} className="text-white" />
        </div>

        <span className="text-[15px] font-medium text-[#2D2D2D]">
          Add Question Type
        </span>
      </button>

      {/* Totals */}
      <div className="mt-8 flex flex-col items-end gap-2">
        <p className="text-[15px] text-[#2D2D2D]">
          Total Questions : 25
        </p>

        <p className="text-[15px] text-[#2D2D2D]">
          Total Marks : 60
        </p>
      </div>

      {/* Additional Information */}
      <div className="mt-10">
        <label className="text-[15px] font-medium text-[#2F2F2F]">
          Additional Information (For better output)
        </label>

        <div className="mt-3 min-h-[140px] rounded-[24px] border border-[#E4E4E4] bg-[#FAFAFA] p-5 relative">
          <textarea
            placeholder="e.g Generate a question paper for 3 hour exam duration..."
            className="w-full h-full bg-transparent outline-none resize-none text-[15px] placeholder:text-[#B2B2B2]"
          />

          <button className="absolute bottom-5 right-5">
            <Mic
              size={18}
              className="text-[#6D6D6D]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}