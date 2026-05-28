import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import type { AssignmentFormData,QuestionType } from '@/utils/types'

type Assessment = {
  _id : string,  
  title : string,
  dueDate: string;
  createdAt : string;
};

type AssessmentStore = {
    sendingtoqueue : boolean,
    sendtoqueue : (data : AssignmentFormData) => void,
    assessments : Assessment[],
    setAssessments : () => void,
    assessmentsloading : boolean,
    assignment : null | any,
    setAssignment : (id : string) => void
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
            const response = await axiosInstance.get('/api/get-assessments');
            set({assessments : response.data.data})
        } catch (error) {
            console.log("cannot send request")
        }
        finally {
            set({assessmentsloading : false})
        }
    },
    assignment : null,
    setAssignment : async(id : string) => {
        try {
            const res = await axiosInstance.get(`/api/get-assessment/${id}`)
            set({assignment : res.data.data})
        } catch (error) {
            console.log("cannot send request")
        }
    }
}))
