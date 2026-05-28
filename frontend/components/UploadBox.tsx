"use client";

import { useRef } from "react";
import { FileText, ImageIcon, UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";
import { useUIStore } from "@/store/useUIStore";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE_MB = 10;

export default function UploadBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { file, setFile } = useUIStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Type check
    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      toast.error("Invalid file type. Please upload a PDF, JPG, JPEG, or PNG.");
      // reset input so the same file can be re-tried after correction
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    // Size check
    const sizeMB = selectedFile.size / 1024 / 1024;
    if (sizeMB > MAX_SIZE_MB) {
      toast.error(`File is too large (${sizeMB.toFixed(1)} MB). Maximum allowed size is ${MAX_SIZE_MB} MB.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const isImage = file?.type.startsWith("image/");

  return (
    <div className="border-2 border-dashed border-[#D8D8D8] rounded-[24px] min-h-[240px] bg-[#FAFAFA] flex flex-col items-center justify-center px-6 py-8 transition">
      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />

      {!file ? (
        <>
          {/* Upload Icon */}
          <div className="w-16 h-16 rounded-full bg-[#F1F1F1] flex items-center justify-center">
            <UploadCloud size={30} className="text-[#2D2D2D]" />
          </div>

          {/* Text */}
          <p className="mt-5 text-[16px] text-[#2D2D2D] font-medium">
            Choose a file or drag & drop it here
          </p>
          <p className="mt-2 text-[13px] text-[#9A9A9A]">
            Supports PDF, JPG, JPEG & PNG up to {MAX_SIZE_MB}MB
          </p>

          {/* Browse */}
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-6 h-[42px] px-6 rounded-full bg-[#F0F0F0] text-[14px] font-medium hover:bg-[#E8E8E8] transition"
          >
            Browse Files
          </button>
        </>
      ) : (
        <div className="w-full max-w-[520px] rounded-[22px] bg-white border border-[#E8E8E8] p-5 flex items-center justify-between shadow-sm">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F3F3F3] flex items-center justify-center">
              {isImage ? (
                <ImageIcon size={24} className="text-[#2D2D2D]" />
              ) : (
                <FileText size={24} className="text-[#2D2D2D]" />
              )}
            </div>
            <div>
              <p className="text-[15px] font-medium text-[#2D2D2D] break-all">{file.name}</p>
              <p className="mt-1 text-[13px] text-[#8A8A8A]">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          {/* Remove */}
          <button
            onClick={removeFile}
            className="w-10 h-10 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition"
          >
            <X size={18} className="text-[#777]" />
          </button>
        </div>
      )}
    </div>
  );
}