"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, ChevronDown, ArrowLeft, LayoutGrid, Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopNavbar() {
  const router = useRouter();
  const user = useUser();
  const nameDisplay = user.user?.firstName || user.user?.primaryEmailAddress?.emailAddress
  return (
    <div className="w-full h-[60px] md:h-[72px] bg-[#FFFFFFBF] rounded-[18px] md:rounded-[22px] px-4 md:px-8 flex items-center justify-between shadow-sm flex-shrink-0">
      {/* Left Side */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Mobile: logo; Desktop: back + breadcrumb */}
        <div className="md:hidden">
          <Image src="/VedaAI-cropped.svg" alt="VedaAI" width={100} height={40} className="object-contain" />
        </div>
        <div className="hidden md:flex items-center gap-5">
          <button className="text-[#2E2E2E] hover:opacity-70 transition"
          onClick={() => {
            router.push('/dashboard')
          }}
          >
            <ArrowLeft size={28} strokeWidth={2.2} />
          </button>
          <div className="flex items-center gap-3 text-[#A1A1A1]">
            <LayoutGrid size={18} />
            <span className="text-[16px] font-medium">Assignment</span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 md:gap-7">
        <button className="relative">
          <Bell size={20} strokeWidth={2} className="text-[#2D2D2D]" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#FF6A2B] rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <UserButton/>
          <span className="hidden md:block text-[17px] font-semibold text-[#2F2F2F]">{nameDisplay}</span>
        </div>
      </div>
    </div>
  );
}