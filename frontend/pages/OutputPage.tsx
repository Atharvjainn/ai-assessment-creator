import QuestionPaper from '@/components/QuestionPaper'
import { useAssessmentStore } from '@/store/useAssessmentStore'


export const OutputPage = () => {
    const {assignment} = useAssessmentStore()
    const sections = assignment?.generatedPaper.sections
    console.log(sections)
  return (
    <QuestionPaper
  schoolName="Delhi Public School, Sector-4, Bokaro"
  subject="Science"
  className="8th"
  timeAllowed="45 minutes"
  maximumMarks={20}
  sections={sections} 
/>
  )
}
