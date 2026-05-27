"use client";

import {
  Bell,
  ChevronDown,
  ArrowLeft,
  LayoutGrid,
} from "lucide-react";

export default function TopNavbar() {
  return (
    <div className="w-full h-[72px] bg-[#FFFFFFBF] rounded-[22px] px-8 flex items-center justify-between shadow-sm">
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <button className="text-[#2E2E2E] hover:opacity-70 transition">
          <ArrowLeft size={30} strokeWidth={2.2} />
        </button>

        <div className="flex items-center gap-3 text-[#A1A1A1]">
          <LayoutGrid size={20} />

          <span className="text-[17px] font-medium">
            Assignment
          </span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-7">
        {/* Notification */}
        <button className="relative">
          <Bell
            size={24}
            strokeWidth={2}
            className="text-[#2D2D2D]"
          />

          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF6A2B] rounded-full" />
        </button>

        {/* User */}
        <button className="flex items-center gap-3">
          {/* Replace with image */}
          <div className="w-11 h-11 rounded-full bg-[#D8D8D8]" />

          <span className="text-[18px] font-semibold text-[#2F2F2F]">
            John Doe
          </span>

          <ChevronDown
            size={22}
            className="text-[#2F2F2F]"
          />
        </button>
      </div>
    </div>
  );
}