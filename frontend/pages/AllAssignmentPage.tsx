"use client";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import { useRouter } from "next/navigation";

import {
  Search,
  Filter,
  MoreVertical,
  Plus,
} from "lucide-react";

import { useUIStore } from "@/store/useUIStore";
import { useAssessmentStore } from "@/store/useAssessmentStore";

export default function AssignmentsPage() {
  const router = useRouter();

  const { assessments,deleteAssessment } =
    useAssessmentStore();

  const { setCurrentTab } =
    useUIStore();

  const [openMenuId, setOpenMenuId] =
    useState<string | null>(null);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="w-full min-h-full px-8 py-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="mt-2 w-4 h-4 rounded-full bg-[#44D16A] shadow-[0_0_0_8px_rgba(68,209,106,0.22)]" />

        <div>
          <h1 className="text-[32px] font-semibold text-[#2F2F2F]">
            Assignments
          </h1>

          <p className="mt-1 text-[15px] text-[#8A8A8A]">
            Manage and create assignments
            for your classes.
          </p>
        </div>
      </div>

      {/* Top Controls */}
      <div className="mt-8 flex items-center justify-between gap-5">
        {/* Filter */}
        <button className="h-[52px] px-5 rounded-2xl bg-[#F5F5F5] border border-[#E6E6E6] flex items-center gap-3 text-[#6D6D6D]">
          <Filter size={18} />

          <span className="text-[15px]">
            Filter By
          </span>
        </button>

        {/* Search */}
        <div className="w-[340px] h-[52px] rounded-full border border-[#E5E5E5] bg-[#F8F8F8] px-5 flex items-center gap-3">
          <Search
            size={18}
            className="text-[#888]"
          />

          <input
            placeholder="Search Assignment"
            className="flex-1 bg-transparent outline-none text-[15px]"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-2 gap-6">
        {assessments.map((assignment) => (
          <div
            key={assignment._id}
            className="relative h-[180px] rounded-[28px] bg-[#F7F7F7] border border-[#EAEAEA] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
          >
            {/* Menu Button */}
            <button
              onClick={() =>
                setOpenMenuId(
                  openMenuId ===
                    assignment._id
                    ? null
                    : assignment._id
                )
              }
              className="absolute top-5 right-5 text-[#9D9D9D]"
            >
              <MoreVertical size={20} />
            </button>

            {/* Title */}
            <h2 className="text-[22px] font-semibold text-[#2D2D2D]">
              {assignment.title}
            </h2>

            {/* Status Badge */}
            <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium ${
              assignment.status === 'completed' ? 'bg-[#EAF3DE] text-[#3B6D11]' :
              assignment.status === 'processing' ? 'bg-[#E6F1FB] text-[#185FA5]' :
              assignment.status === 'failed'     ? 'bg-[#FCEBEB] text-[#A32D2D]' :
                                                  'bg-[#FAEEDA] text-[#854F0B]'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                assignment.status === 'completed' ? 'bg-[#3B6D11]' :
                assignment.status === 'processing' ? 'bg-[#185FA5]' :
                assignment.status === 'failed'     ? 'bg-[#A32D2D]' :
                                                    'bg-[#854F0B]'
              }`} />
              {assignment.status}
            </div>

            {/* Bottom */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <p className="text-[15px] text-[#7D7D7D]">
                <span className="font-semibold text-[#2D2D2D]">
                  Created :
                </span>{" "}
                {new Date(
                  assignment.createdAt
                ).toLocaleDateString()}
              </p>

              <p className="text-[15px] text-[#7D7D7D]">
                <span className="font-semibold text-[#2D2D2D]">
                  Due :
                </span>{" "}
                {new Date(
                  assignment.dueDate
                ).toLocaleDateString()}
              </p>
            </div>

            {/* Dropdown */}
            {openMenuId ===
              assignment._id && (
              <div
                ref={dropdownRef}
                className="absolute top-14 right-5 w-[170px] rounded-2xl bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-[#ECECEC] overflow-hidden z-20"
              >
                <button
                  className="w-full px-4 py-3 text-left text-[14px] hover:bg-[#F5F5F5] transition"
                  onClick={() => {
                    console.log(
                      assignment._id
                    );

                    router.push(
                      `/output_paper/${assignment._id}`
                    );
                  }}
                >
                  View Assignment
                </button>

               <button
                className="w-full px-4 py-3 text-left text-[14px] text-[#FF4D4D] hover:bg-[#FFF3F3] transition"
                onClick={async () => {
                  if (confirm(`Delete "${assignment.title}"?`)) {
                    await deleteAssessment(assignment._id)
                    setOpenMenuId(null)
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

      {/* Floating Button */}
      <button
        className="fixed bottom-8 left-1/2 -translate-x-1/2 h-[58px] px-8 rounded-full bg-[#171717] text-white flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition"
        onClick={() => {
          setCurrentTab("toolkit");

          router.push(
            "/create-assessment"
          );
        }}
      >
        <Plus size={20} />

        <span className="text-[16px] font-medium">
          Create Assignment
        </span>
      </button>
    </div>
  );
}