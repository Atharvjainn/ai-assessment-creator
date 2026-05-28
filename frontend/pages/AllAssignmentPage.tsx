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

const assignments = [
  {
    id: 1,
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },

  {
    id: 2,
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },

  {
    id: 3,
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },

  {
    id: 4,
    title: "Quiz on Electricity",
    assignedOn: "20-06-2025",
    dueDate: "21-06-2025",
  },
];

export default function AssignmentsPage() {
  const router = useRouter()
  const {activeTab,setCurrentTab} = useUIStore()
  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  // Close on outside click
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
        {/* Green Dot */}
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
        {assignments.map(
          (assignment) => (
            <div
              key={assignment.id}
              ref={dropdownRef}
              className="relative h-[180px] rounded-[28px] bg-[#F7F7F7] border border-[#EAEAEA] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              {/* Menu Button */}
              <button
                onClick={() =>
                  setOpenMenuId(
                    openMenuId ===
                      assignment.id
                      ? null
                      : assignment.id
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

              {/* Bottom */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <p className="text-[15px] text-[#7D7D7D]">
                  <span className="font-semibold text-[#2D2D2D]">
                    Assigned on :
                  </span>{" "}
                  {assignment.assignedOn}
                </p>

                <p className="text-[15px] text-[#7D7D7D]">
                  <span className="font-semibold text-[#2D2D2D]">
                    Due :
                  </span>{" "}
                  {assignment.dueDate}
                </p>
              </div>

              {/* Dropdown */}
              {openMenuId ===
                assignment.id && (
                <div className="absolute top-14 right-5 w-[170px] rounded-2xl bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-[#ECECEC] overflow-hidden z-20">
                  <button className="w-full px-4 py-3 text-left text-[14px] hover:bg-[#F5F5F5] transition">
                    View Assignment
                  </button>

                  <button className="w-full px-4 py-3 text-left text-[14px] text-[#FF4D4D] hover:bg-[#FFF3F3] transition">
                    Delete
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Floating Button */}
      <button className="fixed bottom-8 left-1/2 -translate-x-1/2 h-[58px] px-8 rounded-full bg-[#171717] text-white flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition"
        onClick={() =>{
          setCurrentTab('toolkit')
          router.push('/create-assessment')
        } }
      >
        <Plus size={20} />

        <span className="text-[16px] font-medium">
          Create Assignment
        </span>
      </button>
    </div>
  );
}