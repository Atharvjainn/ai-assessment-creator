"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { OutputPage } from '../../../pages/OutputPage'
import { useAssessmentStore } from "@/store/useAssessmentStore";

const Page = () => {
  const params = useParams();
  const { assignment, setAssignment, stopPolling } = useAssessmentStore()
  const id = params?.id;

  useEffect(() => {
    if (id) {
       setAssignment(id as string);
    }
    return () => { stopPolling() }
  }, [id]);

  if (!assignment) {
    return <div className="p-10">Loading...</div>;
  }

  return <OutputPage />;
};

export default Page;