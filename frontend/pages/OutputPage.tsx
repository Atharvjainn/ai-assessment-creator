import QuestionPaper from '@/components/QuestionPaper'
import { useAssessmentStore } from '@/store/useAssessmentStore'

const  OutputPage = () => {
  const { assignment } = useAssessmentStore()
  const status = assignment?.status

  if (status === 'pending') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-10">
        <div className="w-12 h-12 rounded-full border-4 border-[#E0E0E0] border-t-[#171717] animate-spin" />
        <p className="text-[18px] font-medium text-[#2D2D2D]">Queued for generation...</p>
        <p className="text-[14px] text-[#8A8A8A]">Your paper is waiting to be picked up by the worker.</p>
      </div>
    )
  }

  if (status === 'processing') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-10">
        <div className="w-12 h-12 rounded-full border-4 border-[#E0E0E0] border-t-[#171717] animate-spin" />
        <p className="text-[18px] font-medium text-[#2D2D2D]">Generating your question paper...</p>
        <p className="text-[14px] text-[#8A8A8A]">AI is reading your material and writing questions. This takes 20–40 seconds.</p>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-10">
        <div className="w-12 h-12 rounded-full bg-[#FFF3F3] flex items-center justify-center text-[#FF4D4D] text-[24px]">✕</div>
        <p className="text-[18px] font-medium text-[#2D2D2D]">Generation failed</p>
        <p className="text-[14px] text-[#8A8A8A]">Something went wrong while generating the paper. Please try again.</p>
      </div>
    )
  }

  const sections = assignment?.generatedPaper?.sections
  return (
    <QuestionPaper
      schoolName={assignment.schoolName || "Karan Public School"}
      subject="Science"
      className="8th"
      timeAllowed="45 minutes"
      maximumMarks={assignment?.totalMarks ?? 0}
      sections={sections ?? []}
    />
  )
}

export default OutputPage