import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import type { AssignmentFormData,QuestionType } from '@/utils/types'

type AssessmentStore = {
    sendingtoqueue : boolean,
    sendtoqueue : (data : AssignmentFormData) => void,
    assessments : [],
    setAssessments : () => void,
    assessmentsloading : boolean
}

export const  useAssessmentStore = create<AssessmentStore>((set,get) => ({
    sendingtoqueue : false,
    sendtoqueue : async(data : AssignmentFormData) => {
        set({sendingtoqueue : true})
        try {
            const response = await axiosInstance.post('/api/create-assessment',data)
        } catch (error) {
            console.log("cannot send request")
        }
        finally{
            set({sendingtoqueue : false})
        }
    },
    assessments : [],
    assessmentsloading : false,
    setAssessments : async() => {
        set({assessmentsloading : true})
        try {
            const response = await axiosInstance.get('/get-assessments');
            set({assessments : response.data.data})
        } catch (error) {
            console.log("cannot send request")
        }
        finally {
            set({assessmentsloading : false})
        }
    }
}))
