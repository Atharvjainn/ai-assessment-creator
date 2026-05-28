"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";

export default function EmptyAssignment() {
  const { setCurrentTab } = useUIStore();
  const router = useRouter();
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        <Image
          src="test.svg"
          alt="Empty Assignment"
          width={300}
          height={300}
          priority
          className="object-contain w-[180px] h-[180px] md:w-[300px] md:h-[300px]"
        />

        <h2 className="mt-2 text-[26px] md:text-[40px] font-bold text-[#2F2F2F]">
          No assignments yet
        </h2>

        <p className="mt-3 max-w-[600px] text-[15px] md:text-[22px] leading-[26px] md:leading-[38px] text-[#7B7B7B]">
          Create your first assignment to start collecting and grading student submissions.
          You can set up rubrics, define marking criteria, and let AI assist with grading.
        </p>

        <button
          className="mt-8 h-[52px] md:h-[64px] px-7 md:px-10 rounded-full bg-[#171717] text-white flex items-center gap-2 md:gap-3 text-[16px] md:text-[20px] font-medium hover:opacity-90 transition cursor-pointer"
          onClick={() => { setCurrentTab("toolkit"); router.push("/create-assessment"); }}
        >
          <Plus size={22} />
          <span>Create Your First Assignment</span>
        </button>
      </div>
    </div>
  );
}