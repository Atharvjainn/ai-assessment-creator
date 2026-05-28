"use client";

import { Sparkles } from "lucide-react";

import AssignmentForm from "../components/AssignmentForm";
import NavigationButtons from "../components/NavigationButtons";
import StepProgress from "../components/StepProgress";

export default function CreateAssignmentPage() {
  return (
    <div className="w-full min-h-full px-10 py-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            {/* Green Glow Icon */}
            <div className="w-10 h-10 rounded-full bg-[#B9EBC4] flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[#47C766]" />
            </div>

            <h1 className="text-[28px] font-semibold text-[#2D2D2D]">
              Create Assignment
            </h1>
          </div>

          <p className="mt-3 text-[15px] text-[#8A8A8A]">
            Set up a new assignment for your students
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-8">
        <StepProgress />
      </div>

      {/* Form */}
      <div className="mt-8 flex justify-center">
        <AssignmentForm />
      </div>

      {/* Bottom Buttons */}
      <div className="mt-10">
        <NavigationButtons />
      </div>
    </div>
  );
}