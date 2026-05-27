"use client";

import Image from "next/image";
import { Plus } from "lucide-react";

export default function EmptyAssignment() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        {/* Illustration */}
        <Image
          src="test.svg"
          alt="Empty Assignment"
          width={300}
          height={300}
          priority
          className="object-contain"
        />

        {/* Text */}
        <h2 className="mt-2 text-[40px] font-bold text-[#2F2F2F]">
          No assignments yet
        </h2>

        <p className="mt-4 max-w-[700px] text-[26px] leading-[42px] text-[#7B7B7B]">
          Create your first assignment to start collecting and
          grading student submissions. You can set up rubrics,
          define marking criteria, and let AI assist with grading.
        </p>

        {/* CTA Button */}
        <button className="mt-10 h-[64px] px-10 rounded-full bg-[#171717] text-white flex items-center gap-3 text-[24px] font-medium hover:opacity-90 transition">
          <Plus size={28} />

          <span>Create Your First Assignment</span>
        </button>
      </div>
    </div>
  );
}