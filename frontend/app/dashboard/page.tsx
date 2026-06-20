'use client'
import EmptyAssignment from '@/components/EmptyAssignment'
import AllAssignmentPage from '@/screens/AllAssignmentPage'
import { useAssessmentStore } from '@/store/useAssessmentStore'
import { useUser } from '@clerk/nextjs'
import { Loader, Loader2, LoaderCircleIcon } from 'lucide-react'
import { useEffect } from 'react'

const page = () => {
  const {assessments,setAssessments,assessmentsloading} = useAssessmentStore();
  const {user , isLoaded} = useUser();

  useEffect(() => {
  if (!isLoaded || !user) return;

  setAssessments(user.id);
}, [user, isLoaded]);


  if(assessmentsloading){
    return (
      <div className='h-full w-full flex items-center justify-center'>
        <LoaderCircleIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <>
      {assessments.length > 0 && assessmentsloading === false ? (
        <AllAssignmentPage />
      ) : (
        <EmptyAssignment />
      )}
      
    </>
  )
}

export default page