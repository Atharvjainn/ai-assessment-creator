"use client";

import {
  LayoutGrid,
  Users,
  FileText,
  BookOpen,
  Clock3,
  Settings,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  {
    label: "Home",
    icon: LayoutGrid,
  },
  {
    label: "My Groups",
    icon: Users,
  },
  {
    label: "Assignments",
    icon: FileText,
    active: true,
  },
  {
    label: "AI Teacher’s Toolkit",
    icon: BookOpen,
  },
  {
    label: "My Library",
    icon: Clock3,
  },
];

export default function Sidebar() {
  return (
    <div className="w-[330px] h-full bg-[#f5f5f5] rounded-2xl shadow-[0_32px_48px_rgba(0,0,0,0.20),0_16px_48px_rgba(0,0,0,0.12)]">
      <div className="h-full rounded-[28px]  px-7 py-6 flex flex-col shadow-sm">
        {/* Logo */}
        {/* <div className="flex items-center justify-start gap-3"> */}
          {/* Replace with your logo */}
          {/* <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 via-orange-600 to-pink-600" /> */}
          
          <Image src="VedaAI-cropped.svg" alt="VedaAI Logo" width={150} height={100} priority className="object-contain" />

          {/* Replace with image/logo text */}
          {/* <h1 className="text-[20px] font-semibold text-[#2D2D2D]">
            VedaAI
          </h1> */}
        {/* </div> */}

        {/* Create Assignment Button */}
        <button className="mt-10 h-[54px] rounded-full bg-[#2F3137] border-[4px] border-[#F07B57] text-white flex items-center justify-center gap-3 shadow-md transition-all duration-200 hover:scale-[1.02]">
          <Sparkles size={18} fill="white" />
          <span className="text-[15px] font-medium">
            Create Assignment
          </span>
        </button>

        {/* Menu */}
        <div className="mt-16 flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                className={`flex items-center gap-3 h-[42px] px-4 rounded-xl transition-all duration-200 ${
                  item.active
                    ? "bg-[#DDDDDD] text-[#2E2E2E]"
                    : "text-[#808080] hover:bg-[#E4E4E4]"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  className={
                    item.active ? "text-[#3B3B3B]" : "text-[#8A8A8A]"
                  }
                />

                <span
                  className={`text-[15px] ${
                    item.active ? "font-medium" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          {/* Settings */}
          <button className="flex items-center gap-3 px-4 text-[#7D7D7D] hover:text-black transition-colors">
            <Settings size={20} />
            <span className="text-[15px]">Settings</span>
          </button>

          {/* School Card */}
          <div className="mt-6 bg-[#E3E3E3] rounded-2xl p-4 flex items-center gap-4">
            {/* Replace with profile image */}
            <div className="w-14 h-14 rounded-full bg-[#CFCFCF]" />

            <div>
              <h3 className="text-[18px] font-semibold text-[#2F2F2F] leading-none">
                Delhi Public School
              </h3>

              <p className="mt-2 text-[15px] text-[#6F6F6F]">
                Bokaro Steel City
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}