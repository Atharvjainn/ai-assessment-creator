"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";

import { axiosInstance } from "@/utils/axios";
import {OutputPage} from '../../../pages/OutputPage'
import { useAssessmentStore } from "@/store/useAssessmentStore";

const Page = () => {
  const params = useParams();
  const {assignment,setAssignment} = useAssessmentStore()
  const id = params?.id;

  
  useEffect(() => {
    if (id) {
      setAssignment(id as string);
    }
  }, [id]);

  if (!assignment) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <OutputPage />
  );
};

export default Page;