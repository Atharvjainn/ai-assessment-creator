'use client'
import EmptyAssignment from '@/components/EmptyAssignment'
import AllAssignmentPage from '@/pages/AllAssignmentPage'
import { useAssessmentStore } from '@/store/useAssessmentStore'
import { useEffect } from 'react'

const page = () => {
  const {assessments,setAssessments,assessmentsloading} = useAssessmentStore();
  useEffect(() => {
    setAssessments();
  }, [])

  return (
    <>
      {assessments.length > 0 ? (
        <AllAssignmentPage />
      ) : (
        <EmptyAssignment />
      )}
      
    </>
  )
}

export default page