"use client";

import AssignmentForm from "../components/AssignmentForm";
import NavigationButtons from "../components/NavigationButtons";
import StepProgress from "../components/StepProgress";

export default function CreateAssignmentPage() {
  return (
    <div className="w-full min-h-full px-4 md:px-10 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#B9EBC4] flex items-center justify-center">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#47C766]" />
            </div>
            <h1 className="text-[22px] md:text-[28px] font-semibold text-[#2D2D2D]">Create Assignment</h1>
          </div>
          <p className="mt-2 text-[13px] md:text-[15px] text-[#8A8A8A]">Set up a new assignment for your students</p>
        </div>
      </div>

      <div className="mt-6 md:mt-8">
        <StepProgress />
      </div>

      <div className="mt-6 md:mt-8 flex justify-center">
        <AssignmentForm />
      </div>

      <div className="mt-8 md:mt-10">
        <NavigationButtons />
      </div>
    </div>
  );
}