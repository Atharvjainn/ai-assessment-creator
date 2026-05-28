import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import type { AssignmentFormData } from '@/utils/types'
import toast from 'react-hot-toast'
import { socket } from '@/utils/sockets'

type Assessment = {
  _id: string;
  title: string;
  dueDate: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
};

type AssessmentStore = {
  sendingtoqueue: boolean;
  sendtoqueue: (data: AssignmentFormData) => Promise<void>;
  assessments: Assessment[];
  setAssessments: () => Promise<void>;
  assessmentsloading: boolean;
  assignment: null | any;
  setAssignment: (id: string) => Promise<void>;
  stopListening: (id: string) => void;
  deleteAssessment: (id: string) => Promise<void>;
}

export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  sendingtoqueue: false,

  sendtoqueue: async (data: AssignmentFormData) => {
    set({ sendingtoqueue: true });
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

  setAssignment: async (id: string) => {
    try {
      const res = await axiosInstance.get(`/api/get-assessment/${id}`);
      const data = res.data.data;
      set({ assignment: data });

      if (data.status === 'pending' || data.status === 'processing') {
        socket.connect();

        
        socket.emit("watch:assignment", id);

        socket.on("assignment:updated", async (payload: { assignmentId: string; status: string }) => {
         
          try {
            const updated = await axiosInstance.get(`/api/get-assessment/${id}`);
            set({ assignment: updated.data.data });
          } catch {
            console.log("Error re-fetching assignment");
          }

          if (payload.status === 'completed' || payload.status === 'failed') {
            get().stopListening(id);
          }
        });

        socket.on("connect_error", () => {
          toast.error("Lost connection to server. Please refresh.");
          get().stopListening(id);
        });
      }
    } catch (error) {
      console.log("Cannot fetch assignment");
      toast.error('Something went wrong. Please try again.');
    }
  },

  stopListening: (id: string) => {
    socket.emit("unwatch:assignment", id);  //exit krdo
    socket.off("assignment:updated");
    socket.off("connect_error");
    socket.disconnect();
  },

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