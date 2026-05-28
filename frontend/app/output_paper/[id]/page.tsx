"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { OutputPage } from '../../../pages/OutputPage'
import { useAssessmentStore } from "@/store/useAssessmentStore";

const Page = () => {
  const params = useParams();
  const { assignment, setAssignment, stopListening } = useAssessmentStore();
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      setAssignment(id);
    }
    return () => {
      if (id) stopListening(id);
    };
  }, [id]);

  if (!assignment) {
    return <div className="p-10">Loading...</div>;
  }

  return <OutputPage />;
};

export default Page;