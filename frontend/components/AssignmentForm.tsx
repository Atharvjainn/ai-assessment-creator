"use client";

import { useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Minus,
  Plus,
  Mic,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import UploadBox from "./UploadBox";
import type { QuestionType, AssignmentFormData } from "../utils/types";
import { useUIStore } from "@/store/useUIStore";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useUser } from "@clerk/nextjs";

export default function AssignmentForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const { file, setFile } = useUIStore();
  const { sendtoqueue } = useAssessmentStore();

  const initialFormData: AssignmentFormData = {
    uploadedFileUrl: "",
    title: "",
    dueDate: "",
    additionalInstructions: "",
    questionTypes: [
      { type: "Multiple Choice Questions", numberOfQuestions: 4, marks: 1 },
      { type: "Short Questions", numberOfQuestions: 3, marks: 2 },
    ],
  };

  const [formData, setFormData] = useState<AssignmentFormData>(initialFormData);

  // ----------------------------
  // TOTALS
  // ----------------------------

  const totalQuestions = useMemo(
    () => formData.questionTypes.reduce((acc, item) => acc + item.numberOfQuestions, 0),
    [formData.questionTypes]
  );

  const totalMarks = useMemo(
    () => formData.questionTypes.reduce((acc, item) => acc + item.numberOfQuestions * item.marks, 0),
    [formData.questionTypes]
  );

  // ----------------------------
  // VALIDATION — toasts only
  // ----------------------------

  const validate = (): boolean => {
    // Reference file
    if (!file) {
      toast.error("Please upload a reference file before generating.");
      return false;
    }

    // Title
    if (!formData.title.trim()) {
      toast.error("Assignment title is required.");
      return false;
    }

    // Due date
    if (!formData.dueDate) {
      toast.error("Please select a due date.");
      return false;
    }
    const selected = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      toast.error("Due date cannot be in the past.");
      return false;
    }

    // At least one question type
    if (formData.questionTypes.length === 0) {
      toast.error("Add at least one question type.");
      return false;
    }

    // Every question type row must have a name
    const emptyRow = formData.questionTypes.findIndex((qt) => !qt.type.trim());
    if (emptyRow !== -1) {
      toast.error(`Question type name is missing on row ${emptyRow + 1}.`);
      return false;
    }

    return true;
  };

  // ----------------------------
  // FIELD UPDATERS
  // ----------------------------

  const updateField = (field: keyof AssignmentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateQuestionType = (
    index: number,
    field: keyof QuestionType,
    value: string | number
  ) => {
    const updated = [...formData.questionTypes];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, questionTypes: updated }));
  };

  const addQuestionType = () => {
    setFormData((prev) => ({
      ...prev,
      questionTypes: [...prev.questionTypes, { type: "", numberOfQuestions: 1, marks: 1 }],
    }));
  };

  const removeQuestionType = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questionTypes: prev.questionTypes.filter((_, i) => i !== index),
    }));
  };

  // ----------------------------
  // SUBMIT
  // ----------------------------
  const user = useUser();

  const handleSubmit = async () => {
    if (!validate()) return;
    const schoolName = user.user?.unsafeMetadata.schoolName;
    const address = user.user?.unsafeMetadata.address;
    // const userId = user.user?.id;

    setIsSubmitting(true);
    try {
      let payload = { ...formData };
      if (file) {
        const upload = await uploadToCloudinary(file);
        payload = { ...formData, uploadedFileUrl: upload.url };
      }
      await sendtoqueue(payload,schoolName as string,address as string);
      setFormData(initialFormData);
      setFile(null);
      setSubmitted(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[980px] rounded-[20px] md:rounded-[30px] bg-[#F5F5F5] p-5 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
      {/* Heading */}
      <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2D2D2D]">
        Assignment Details
      </h2>
      <p className="mt-1 text-[#8A8A8A] text-[13px] md:text-[14px]">
        Basic information about your assignment
      </p>

      {/* Upload */}
      <div className="mt-8">
        <label className="text-[15px] font-medium text-[#2F2F2F]">
          Reference File <span className="text-[#E05252]">*</span>
        </label>
        <div className="mt-3">
          <UploadBox />
        </div>
      </div>

      {/* Title */}
      <div className="mt-8">
        <label className="text-[15px] font-medium text-[#2F2F2F]">
          Assignment Title <span className="text-[#E05252]">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="e.g Quiz on Electricity"
          className="mt-3 w-full h-[54px] rounded-full border border-[#E1E1E1] bg-[#FAFAFA] px-5 outline-none text-[15px] text-[#2D2D2D] placeholder:text-[#B1B1B1] focus:border-[#ABABAB] transition-colors"
        />
      </div>

      {/* Due Date */}
      <div className="mt-8">
        <label className="text-[15px] font-medium text-[#2F2F2F]">
          Due Date <span className="text-[#E05252]">*</span>
        </label>
        <div className="mt-3">
          <div
            onClick={() => dateInputRef.current?.showPicker()}
            className="mt-3 w-full h-[54px] rounded-full border border-[#E1E1E1] bg-[#FAFAFA] px-5 flex items-center justify-between cursor-pointer relative"
          >
            <input
              ref={dateInputRef}
              type="date"
              value={formData.dueDate}
              onChange={(e) => updateField("dueDate", e.target.value)}
              className="absolute opacity-0 pointer-events-none"
            />
            <span className={`text-[15px] ${formData.dueDate ? "text-[#2D2D2D]" : "text-[#B1B1B1]"}`}>
              {formData.dueDate
                ? new Date(formData.dueDate).toLocaleDateString("en-GB")
                : "DD-MM-YYYY"}
            </span>
            <CalendarDays size={20} className="text-[#6D6D6D]" />
          </div>
        </div>
      </div>

      {/* Question Types Header */}
      <div className="mt-10 hidden md:grid grid-cols-[1fr_120px_120px_40px] gap-5 px-2">
        <p className="text-[14px] font-medium">
          Question Type <span className="text-[#E05252]">*</span>
        </p>
        <p className="text-[14px] font-medium text-center">Questions</p>
        <p className="text-[14px] font-medium text-center">Marks</p>
      </div>

      {/* Rows */}
      <div className="mt-4 flex flex-col gap-4">
        {formData.questionTypes.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[1fr_120px_120px_40px] gap-2 md:gap-5"
          >
            {/* Question Type Name */}
            <input
              value={item.type}
              onChange={(e) => updateQuestionType(index, "type", e.target.value)}
              placeholder="e.g. Multiple Choice Questions"
              className="h-[48px] md:h-[54px] rounded-full border border-[#E8E8E8] bg-[#FAFAFA] px-5 outline-none text-[14px] md:text-[15px] focus:border-[#ABABAB] transition-colors"
            />

            <div className="flex gap-2 md:contents">
              {/* Number of Questions */}
              <div className="flex-1 md:flex-none h-[48px] md:h-[54px] rounded-full border border-[#E8E8E8] bg-[#FAFAFA] px-4 flex items-center justify-between">
                <span className="text-[11px] text-[#999] md:hidden mr-1">Qs</span>
                <button
                  onClick={() =>
                    updateQuestionType(index, "numberOfQuestions", Math.max(1, item.numberOfQuestions - 1))
                  }
                >
                  <Minus size={14} />
                </button>
                <span className="text-[14px]">{item.numberOfQuestions}</span>
                <button
                  onClick={() =>
                    updateQuestionType(index, "numberOfQuestions", item.numberOfQuestions + 1)
                  }
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Marks */}
              <div className="flex-1 md:flex-none h-[48px] md:h-[54px] rounded-full border border-[#E8E8E8] bg-[#FAFAFA] px-4 flex items-center justify-between">
                <span className="text-[11px] text-[#999] md:hidden mr-1">Marks</span>
                <button
                  onClick={() =>
                    updateQuestionType(index, "marks", Math.max(1, item.marks - 1))
                  }
                >
                  <Minus size={14} />
                </button>
                <span className="text-[14px]">{item.marks}</span>
                <button onClick={() => updateQuestionType(index, "marks", item.marks + 1)}>
                  <Plus size={14} />
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeQuestionType(index)}
                className="w-10 flex items-center justify-center"
              >
                <X size={16} className="text-[#888]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Type */}
      <button onClick={addQuestionType} className="mt-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#2D2D2D] flex items-center justify-center">
          <Plus size={16} className="text-white" />
        </div>
        <span className="text-[15px] font-medium">Add Question Type</span>
      </button>

      {/* Totals */}
      <div className="mt-8 flex flex-col items-end gap-2">
        <p className="text-[15px]">Total Questions : {totalQuestions}</p>
        <p className="text-[15px]">Total Marks : {totalMarks}</p>
      </div>

      {/* Additional Instructions */}
      <div className="mt-10">
        <label className="text-[15px] font-medium">
          Additional Information{" "}
          <span className="text-[12px] font-normal text-[#9A9A9A]">(optional)</span>
        </label>
        <div className="mt-3 min-h-[140px] rounded-[24px] border border-[#E4E4E4] bg-[#FAFAFA] p-5 relative">
          <textarea
            value={formData.additionalInstructions}
            onChange={(e) => updateField("additionalInstructions", e.target.value)}
            placeholder="e.g Generate a question paper for 3 hour exam duration..."
            className="w-full h-full bg-transparent outline-none resize-none text-[15px]"
          />
          <button className="absolute bottom-5 right-5">
            <Mic size={18} className="text-[#6D6D6D]" />
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || submitted}
        className="mt-10 w-full h-[56px] rounded-full bg-[#171717] text-white text-[15px] font-medium hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
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