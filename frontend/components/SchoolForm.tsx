'use client'
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SchoolForm() {
  const {user} = useUser();
  const router = useRouter();
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await user?.update({
        unsafeMetadata: {
          schoolName,
          address,
        },
      });

      console.log("Saved");
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
        {/* Content */}
        <div className="px-10 py-8">
          <h1 className="text-center text-3xl font-bold text-neutral-900">
            Add School
          </h1>

          <p className="mt-2 text-center text-neutral-500">
            Enter your school details to continue
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* School Name */}
            <div>
              <label
                htmlFor="schoolName"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                School Name
              </label>

              <input
                id="schoolName"
                type="text"
                placeholder="Enter school name"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition-all focus:border-neutral-500"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Address
              </label>

              <textarea
                id="address"
                rows={4}
                placeholder="Enter school address"
                className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition-all focus:border-neutral-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-gradient-to-b from-neutral-700 to-neutral-900 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
            >
              Continue →
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 bg-neutral-50 px-8 py-5">
          <p className="text-center text-sm text-neutral-500">
            School details can be updated later
          </p>
        </div>
      </div>
    </div>
  );
}