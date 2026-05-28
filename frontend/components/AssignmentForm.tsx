"use client";

import { useMemo, useState,useRef } from "react";
import { useRouter } from 'next/navigation'
import {
  CalendarDays,
  Minus,
  Plus,
  Mic,
  X,
} from "lucide-react";

import UploadBox from "./UploadBox";
import type {QuestionType,AssignmentFormData} from '../utils/types'
import { useUIStore } from "@/store/useUIStore";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { useAssessmentStore } from "@/store/useAssessmentStore";

export default function AssignmentForm() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const { sendingtoqueue } = useAssessmentStore()
  const initialFormData: AssignmentFormData =
{
  uploadedFileUrl: "",
  title : "",
  dueDate: "",

  additionalInstructions: "",

  questionTypes: [
    {
      type: "Multiple Choice Questions",

      numberOfQuestions: 4,

      marks: 1,
    },

    {
      type: "Short Questions",

      numberOfQuestions: 3,

      marks: 2,
    },
  ],
};
  const [formData, setFormData] =
    useState<AssignmentFormData>(initialFormData);

  // ----------------------------
  // TOTALS
  // ----------------------------

  const totalQuestions = useMemo(() => {
    return formData.questionTypes.reduce(
      (acc, item) =>
        acc + item.numberOfQuestions,
      0
    );
  }, [formData.questionTypes]);

  const totalMarks = useMemo(() => {
    return formData.questionTypes.reduce(
      (acc, item) =>
        acc +
        item.numberOfQuestions * item.marks,
      0
    );
  }, [formData.questionTypes]);

  // ----------------------------
  // UPDATE NORMAL FIELD
  // ----------------------------

  const updateField = (
    field: keyof AssignmentFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,

      [field]: value,
    }));
  };

  // ----------------------------
  // UPDATE QUESTION TYPE
  // ----------------------------

  const updateQuestionType = (
    index: number,

    field: keyof QuestionType,

    value: string | number
  ) => {
    const updated = [
      ...formData.questionTypes,
    ];

    updated[index] = {
      ...updated[index],

      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,

      questionTypes: updated,
    }));
  };

  // ----------------------------
  // ADD QUESTION TYPE
  // ----------------------------

  const addQuestionType = () => {
    setFormData((prev) => ({
      ...prev,

      questionTypes: [
        ...prev.questionTypes,

        {
          type: "",

          numberOfQuestions: 1,

          marks: 1,
        },
      ],
    }));
  };

  // ----------------------------
  // REMOVE QUESTION TYPE
  // ----------------------------

  const removeQuestionType = (
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,

      questionTypes:
        prev.questionTypes.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // ----------------------------
  // SUBMIT
  // ----------------------------

  const handleSubmit = async() => {
    console.log(formData);
    let payload  = { ...formData };
    if(file){
      const upload = await uploadToCloudinary(file!)
       payload = {
        ...formData,
        uploadedFileUrl : upload.url
      }
    }
    await sendtoqueue(payload)
    setFormData(initialFormData)
    setFile(null)
    setSubmitted(true)
    setTimeout(() => router.push('/dashboard'), 1500)
    
  };

  const dateInputRef =
  useRef<HTMLInputElement>(null);
  const {file,setFile} = useUIStore()
  const {sendtoqueue} = useAssessmentStore()

  return (
    <div className="w-full max-w-[980px] rounded-[30px] bg-[#F5F5F5] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
      {/* Heading */}
      <div>
        <h2 className="text-[28px] font-semibold text-[#2D2D2D]">
          Assignment Details
        </h2>

        <p className="mt-1 text-[#8A8A8A] text-[14px]">
          Basic information about your
          assignment
        </p>
      </div>

      {/* Upload */}
      <div className="mt-8">
        <UploadBox />
      </div>

      <div className="mt-8">
    <label className="text-[15px] font-medium text-[#2F2F2F]">
    Assignment Title
    </label>

      <input
        type="text"
        value={formData.title}
        onChange={(e) =>
          updateField(
            "title",
            e.target.value
          )
        }
        placeholder="e.g Quiz on Electricity"
        className="mt-3 w-full h-[54px] rounded-full border border-[#E1E1E1] bg-[#FAFAFA] px-5 outline-none text-[15px] text-[#2D2D2D] placeholder:text-[#B1B1B1]"
      />
    </div>

      {/* Due Date */}
      <div className="mt-8">
        <label className="text-[15px] font-medium text-[#2F2F2F]">
          Due Date
        </label>

        <div className="mt-3 relative">
            <div
            onClick={() =>
              dateInputRef.current?.showPicker()
            }
            className="mt-3 w-full h-[54px] rounded-full border border-[#E1E1E1] bg-[#FAFAFA] px-5 flex items-center justify-between cursor-pointer relative"
          >
            {/* Hidden Native Input */}
            <input
              ref={dateInputRef}
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                updateField(
                  "dueDate",
                  e.target.value
                )
              }
              className="absolute opacity-0 pointer-events-none"
            />

            {/* Display Value */}
            <span
              className={`text-[15px] ${
                formData.dueDate
                  ? "text-[#2D2D2D]"
                  : "text-[#B1B1B1]"
              }`}
            >
              {formData.dueDate
                ? new Date(
                    formData.dueDate
                  ).toLocaleDateString("en-GB")
                : "DD-MM-YYYY"}
            </span>

            {/* Calendar Icon */}
            <CalendarDays
              size={20}
              className="text-[#6D6D6D]"
            />
          </div>


          
        </div>
      </div>

      {/* Header */}
      <div className="mt-10 grid grid-cols-[1fr_120px_120px_40px] gap-5 px-2">
        <p className="text-[14px] font-medium">
          Question Type
        </p>

        <p className="text-[14px] font-medium text-center">
          Questions
        </p>

        <p className="text-[14px] font-medium text-center">
          Marks
        </p>
      </div>

      {/* Rows */}
      <div className="mt-4 flex flex-col gap-4">
        {formData.questionTypes.map(
          (item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_120px_120px_40px] gap-5 items-center"
            >
              {/* Question Type */}
              <input
                value={item.type}
                onChange={(e) =>
                  updateQuestionType(
                    index,

                    "type",

                    e.target.value
                  )
                }
                placeholder="Question Type"
                className="h-[54px] rounded-full border border-[#E8E8E8] bg-[#FAFAFA] px-5 outline-none text-[15px]"
              />

              {/* Questions */}
              <div className="h-[54px] rounded-full border border-[#E8E8E8] bg-[#FAFAFA] px-4 flex items-center justify-between">
                <button
                  onClick={() =>
                    updateQuestionType(
                      index,

                      "numberOfQuestions",

                      Math.max(
                        1,

                        item.numberOfQuestions -
                          1
                      )
                    )
                  }
                >
                  <Minus size={16} />
                </button>

                <span>
                  {item.numberOfQuestions}
                </span>

                <button
                  onClick={() =>
                    updateQuestionType(
                      index,

                      "numberOfQuestions",

                      item.numberOfQuestions +
                        1
                    )
                  }
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Marks */}
              <div className="h-[54px] rounded-full border border-[#E8E8E8] bg-[#FAFAFA] px-4 flex items-center justify-between">
                <button
                  onClick={() =>
                    updateQuestionType(
                      index,

                      "marks",

                      Math.max(
                        1,

                        item.marks - 1
                      )
                    )
                  }
                >
                  <Minus size={16} />
                </button>

                <span>{item.marks}</span>

                <button
                  onClick={() =>
                    updateQuestionType(
                      index,

                      "marks",

                      item.marks + 1
                    )
                  }
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() =>
                  removeQuestionType(index)
                }
              >
                <X
                  size={18}
                  className="text-[#888]"
                />
              </button>
            </div>
          )
        )}
      </div>

      {/* Add */}
      <button
        onClick={addQuestionType}
        className="mt-6 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-[#2D2D2D] flex items-center justify-center">
          <Plus
            size={16}
            className="text-white"
          />
        </div>

        <span className="text-[15px] font-medium">
          Add Question Type
        </span>
      </button>

      {/* Totals */}
      <div className="mt-8 flex flex-col items-end gap-2">
        <p className="text-[15px]">
          Total Questions :{" "}
          {totalQuestions}
        </p>

        <p className="text-[15px]">
          Total Marks : {totalMarks}
        </p>
      </div>

      {/* Additional Instructions */}
      <div className="mt-10">
        <label className="text-[15px] font-medium">
          Additional Information
        </label>

        <div className="mt-3 min-h-[140px] rounded-[24px] border border-[#E4E4E4] bg-[#FAFAFA] p-5 relative">
          <textarea
            value={
              formData.additionalInstructions
            }
            onChange={(e) =>
              updateField(
                "additionalInstructions",

                e.target.value
              )
            }
            placeholder="e.g Generate a question paper for 3 hour exam duration..."
            className="w-full h-full bg-transparent outline-none resize-none text-[15px]"
          />

          <button className="absolute bottom-5 right-5">
            <Mic
              size={18}
              className="text-[#6D6D6D]"
            />
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
  onClick={handleSubmit}
  disabled={sendingtoqueue || submitted}
  className="mt-10 w-full h-[56px] rounded-full bg-[#171717] text-white text-[15px] font-medium hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-3"
>
  {sendingtoqueue ? (
    <>
      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      <span>Sending to queue...</span>
    </>
  ) : submitted ? (
    <span>✓ Queued! Redirecting...</span>
  ) : (
    <span>Generate Assignment</span>
  )}
</button>
    </div>
  );
}