import { UploadCloud } from "lucide-react";

export default function UploadBox() {
  return (
    <div className="border-2 border-dashed border-[#D8D8D8] rounded-[24px] h-[240px] flex flex-col items-center justify-center bg-[#FAFAFA]">
      <UploadCloud
        size={34}
        className="text-[#2D2D2D]"
      />

      <p className="mt-4 text-[16px] text-[#2D2D2D]">
        Choose a file or drag & drop it here
      </p>

      <p className="mt-2 text-[13px] text-[#9A9A9A]">
        JPEG, PNG, upto 10MB
      </p>

      <button className="mt-6 h-[42px] px-6 rounded-full bg-[#F0F0F0] text-[14px] font-medium hover:bg-[#E8E8E8] transition">
        Browse Files
      </button>
    </div>
  );
}