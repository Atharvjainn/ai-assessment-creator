"use client";

import { useRouter } from "next/navigation";
import { LayoutGrid, Users, FileText, BookOpen, Clock3, Plus } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

const bottomItems = [
  { label: "Home", icon: LayoutGrid, tab: "home", route: "/dashboard" },
  { label: "Assignments", icon: FileText, tab: "assignments", route: "/dashboard" },
  { label: "Library", icon: Clock3, tab: "library", route: "/dashboard" },
  { label: "AI Toolkit", icon: BookOpen, tab: "toolkit", route: "/create-assessment" },
];

export default function BottomNav() {
  const router = useRouter();
  const { activeTab, setCurrentTab } = useUIStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* FAB */}
      <button
        onClick={() => { setCurrentTab("toolkit"); router.push("/create-assessment"); }}
        className="absolute -top-6 right-4 w-12 h-12 rounded-full bg-[#171717] text-white flex items-center justify-center shadow-lg"
      >
        <Plus size={22} />
      </button>

      <div className="bg-[#1A1A1A] px-2 pb-safe pt-2 flex items-center justify-around rounded-t-[20px] shadow-[0_-4px_24px_rgba(0,0,0,0.18)]">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => { setCurrentTab(item.tab); router.push(item.route); }}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive ? "text-white" : "text-[#666]"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}