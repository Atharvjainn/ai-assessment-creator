"use client";

import { Settings, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { menuItems } from "@/utils/items";
import { useUIStore } from "@/store/useUIStore";

export default function Sidebar() {
  const router = useRouter();
  const { activeTab, setCurrentTab } = useUIStore();

  const handleNavigation = (tab: string, route: string) => {
    setCurrentTab(tab);
    router.push(route);
  };

  return (
    <div className="hidden md:flex w-[280px] lg:w-[330px] h-full bg-[#f5f5f5] rounded-2xl shadow-[0_32px_48px_rgba(0,0,0,0.20),0_16px_48px_rgba(0,0,0,0.12)] flex-col">
      <div className="h-full px-5 lg:px-7 py-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/VedaAI-cropped.svg" alt="VedaAI Logo" width={130} height={100} priority className="object-contain" />
        </div>

        {/* Create Assignment Button */}
        <button
          className="mt-8 h-[50px] rounded-full bg-[#2F3137] border-[4px] border-[#F07B57] text-white flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
          onClick={() => { setCurrentTab("toolkit"); router.push("/create-assessment"); }}
        >
          <Sparkles size={16} fill="white" />
          <span className="text-[14px] font-medium">Create Assignment</span>
        </button>

        {/* Menu */}
        <div className="mt-10 flex flex-col gap-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={index}
                onClick={() => handleNavigation(item.tab, item.route)}
                className={`flex items-center gap-3 h-[40px] px-4 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive ? "bg-[#DDDDDD] text-[#2E2E2E]" : "text-[#808080] hover:bg-[#E4E4E4]"
                }`}
              >
                <Icon size={18} strokeWidth={2} className={isActive ? "text-[#3B3B3B]" : "text-[#8A8A8A]"} />
                <span className={`text-[14px] ${isActive ? "font-medium" : "font-normal"}`}>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          <button className="flex items-center gap-3 px-4 text-[#7D7D7D] hover:text-black transition-colors">
            <Settings size={18} />
            <span className="text-[14px]">Settings</span>
          </button>

          <div className="mt-4 bg-[#E3E3E3] rounded-2xl p-3 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#CFCFCF] flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-[#2F2F2F] leading-none truncate">Delhi Public School</h3>
              <p className="mt-1.5 text-[13px] text-[#6F6F6F] truncate">Bokaro Steel City</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}