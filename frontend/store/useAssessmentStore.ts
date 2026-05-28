import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import type { AssignmentFormData } from '@/utils/types'
import toast from 'react-hot-toast'


type Assessment = {
  _id: string;
  title: string;
  dueDate: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
};

type AssessmentStore = {
  sendingtoqueue: boolean;
  sendtoqueue: (data: AssignmentFormData) => void;
  assessments: Assessment[];
  setAssessments: () => void;
  assessmentsloading: boolean;
  assignment: null | any;
  setAssignment: (id: string) => void;
  pollAssignment: (id: string) => void;
  stopPolling: () => void;
  _pollTimer: ReturnType<typeof setInterval> | null;
  deleteAssessment: (id: string) => Promise<void>
}

export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  sendingtoqueue: false,

  sendtoqueue: async (data: AssignmentFormData) => {
    set({ sendingtoqueue: true })
    try {
      await axiosInstance.post('/api/create-assessment', data);
      toast.success('Assignment queued for generation!');
    } catch (error) {
      console.log("Cannot send request");
      toast.error('Something went wrong. Please try again.');
    } finally {
      set({ sendingtoqueue: false });
    }
  },

  assessments: [],
  assessmentsloading: false,

  setAssessments: async () => {
    set({ assessmentsloading: true });
    try {
      const response = await axiosInstance.get('/api/get-assessments');
      set({ assessments: response.data.data });
    } catch (error) {
      console.log("Cannot fetch assessments");
      toast.error('Something went wrong. Please try again.');
    } finally {
      set({ assessmentsloading: false });
    }
  },

  assignment: null,
  _pollTimer: null,

  setAssignment: async (id: string) => {
    try {
      const res = await axiosInstance.get(`/api/get-assessment/${id}`);
      const data = res.data.data;
      set({ assignment: data });

      if (data.status === 'pending' || data.status === 'processing') {
         get().pollAssignment(id)
        }
    } catch (error) {
      console.log("Cannot fetch assignment");
      toast.error('Something went wrong. Please try again.');
    }
  },

  pollAssignment: (id: string) => {
    // Don't start a second interval if already running
    if (get()._pollTimer) return
    const timer = setInterval(async () => {
      try {
        const res = await axiosInstance.get(`/api/get-assessment/${id}`)
        const data = res.data.data
        set({ assignment: data })
        if (data.status === 'completed' || data.status === 'failed') {
          get().stopPolling()
        }
      } catch (error) {
        get().stopPolling()
        toast.error('Something went wrong. Please try again.')
      }
    }, 3000)
    set({ _pollTimer: timer })
  },

  stopPolling: () => {
    const timer = get()._pollTimer
    if (timer) {
      clearInterval(timer)
      set({ _pollTimer: null })
    }},

  deleteAssessment: async (id: string) => {
    try {
      await axiosInstance.delete(`/api/delete-assessment/${id}`);
      set((state) => ({
        assessments: state.assessments.filter((a) => a._id !== id)
      }));
      toast.success('Assignment deleted.');
    } catch (error) {
      console.log("Cannot delete assessment");
      toast.error('Something went wrong. Please try again.');
    }
  }
}));