import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NavigationButtons() {
  return (
    <div className="flex items-center justify-between">
      <button className="h-[52px] px-7 rounded-full bg-white flex items-center gap-2 shadow-sm">
        <ArrowLeft size={18} />
        <span>Previous</span>
      </button>

      <button className="h-[52px] px-7 rounded-full bg-[#171717] text-white flex items-center gap-2">
        <span>Next</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}