"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, MoreVertical, Plus } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useAssessmentStore } from "@/store/useAssessmentStore";

export default function AssignmentsPage() {
  const router = useRouter();
  const { assessments, deleteAssessment } = useAssessmentStore();
  const { setCurrentTab } = useUIStore();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full min-h-full px-4 md:px-8 py-5 md:py-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="mt-2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#44D16A] shadow-[0_0_0_6px_rgba(68,209,106,0.22)] flex-shrink-0" />
        <div>
          <h1 className="text-[24px] md:text-[32px] font-semibold text-[#2F2F2F]">Assignments</h1>
          <p className="mt-0.5 text-[13px] md:text-[15px] text-[#8A8A8A]">Manage and create assignments for your classes.</p>
        </div>
      </div>

      {/* Top Controls */}
      <div className="mt-5 md:mt-8 flex items-center justify-between gap-3">
        <button className="h-[44px] md:h-[52px] px-4 md:px-5 rounded-xl md:rounded-2xl bg-[#F5F5F5] border border-[#E6E6E6] flex items-center gap-2 text-[#6D6D6D] flex-shrink-0">
          <Filter size={16} />
          <span className="text-[13px] md:text-[15px]">Filter</span>
        </button>

        <div className="flex-1 h-[44px] md:h-[52px] rounded-full border border-[#E5E5E5] bg-[#F8F8F8] px-4 flex items-center gap-2">
          <Search size={16} className="text-[#888] flex-shrink-0" />
          <input placeholder="Search Assignment" className="flex-1 bg-transparent outline-none text-[14px] min-w-0" />
        </div>
      </div>

      {/* Cards — 1 col mobile, 2 col desktop */}
      <div className="mt-5 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {assessments.map((assignment) => (
          <div
            key={assignment._id}
            className="relative rounded-[20px] md:rounded-[28px] bg-[#F7F7F7] border border-[#EAEAEA] p-5 md:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.06)] min-h-[150px] md:h-[180px]"
          >
            <button
              onClick={() => setOpenMenuId(openMenuId === assignment._id ? null : assignment._id)}
              className="absolute top-4 right-4 text-[#9D9D9D]"
            >
              <MoreVertical size={18} />
            </button>

            <h2 className="text-[18px] md:text-[22px] font-semibold text-[#2D2D2D] pr-6">{assignment.title}</h2>

            <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] md:text-[12px] font-medium ${
              assignment.status === "completed" ? "bg-[#EAF3DE] text-[#3B6D11]" :
              assignment.status === "processing" ? "bg-[#E6F1FB] text-[#185FA5]" :
              assignment.status === "failed" ? "bg-[#FCEBEB] text-[#A32D2D]" :
              "bg-[#FAEEDA] text-[#854F0B]"
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                assignment.status === "completed" ? "bg-[#3B6D11]" :
                assignment.status === "processing" ? "bg-[#185FA5]" :
                assignment.status === "failed" ? "bg-[#A32D2D]" : "bg-[#854F0B]"
              }`} />
              {assignment.status}
            </div>

            <div className="mt-3 md:absolute md:bottom-6 md:left-6 md:right-6 flex items-center justify-between">
              <p className="text-[12px] md:text-[14px] text-[#7D7D7D]">
                <span className="font-semibold text-[#2D2D2D]">Created: </span>
                {new Date(assignment.createdAt).toLocaleDateString()}
              </p>
              <p className="text-[12px] md:text-[14px] text-[#7D7D7D]">
                <span className="font-semibold text-[#2D2D2D]">Due: </span>
                {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            </div>

            {openMenuId === assignment._id && (
              <div
                ref={dropdownRef}
                className="absolute top-12 right-4 w-[160px] rounded-2xl bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-[#ECECEC] overflow-hidden z-20"
              >
                <button
                  className="w-full px-4 py-3 text-left text-[13px] hover:bg-[#F5F5F5] transition"
                  onClick={() => router.push(`/output_paper/${assignment._id}`)}
                >
                  View Assignment
                </button>
                <button
                  className="w-full px-4 py-3 text-left text-[13px] text-[#FF4D4D] hover:bg-[#FFF3F3] transition"
                  onClick={async () => {
                    if (confirm(`Delete "${assignment.title}"?`)) {
                      await deleteAssessment(assignment._id);
                      setOpenMenuId(null);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Button — hidden on mobile (FAB in BottomNav handles it) */}
      <button
        className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 h-[58px] px-8 rounded-full bg-[#171717] text-white items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition"
        onClick={() => { setCurrentTab("toolkit"); router.push("/create-assessment"); }}
      >
        <Plus size={20} />
        <span className="text-[16px] font-medium">Create Assignment</span>
      </button>
    </div>
  );
}