import axiosInstance from '@/lib/axiosInstance.js';
import {create} from 'zustand';

export const useResponseStore = create((set,get) => ({
    response: null,
    responses:[],
    isLoading: false,
    responders: [],
    error: null,
    isAddingResponse: false,
    responseError: null,
    addResponse: async (templateId, answers) => {
        try {
          console.log("Submitting response..."); 
          set({ isAddingResponse: true, responseError: null });
          const res = await axiosInstance.post(`/response/${templateId}/submit`, { answers });
          console.log("Response submitted successfully:", res.data);
          await get().getResponders(templateId);
          set({ response: res.data.response, isAddingResponse: false });
        } catch (error) {
          console.error("Error in addResponse:", error);
          set({ responseError: error.response?.data?.error || "Unknown error", isAddingResponse: false });
          throw error; 
        }
      },      
    getResponders: async (templateId) => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get(`/response/${templateId}/get-responders`);
            set({ responders: res.data.responses, isLoading: false });
            return res.data.responses;
        } catch (error) {
            set({ error: error.response.data.error, isLoading: false });
            throw Error(error);
        }
    },
    getAggregates: async (templateId) => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get(`/response/${templateId}/get-aggregates`);
            set({ responses: res.data.results, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.error, isLoading: false });
            throw Error(error);
        }
    },
    getMyresponse: async (templateId) => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get(`/response/${templateId}/my-response`);
            set({ response: res.data.response, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.error, isLoading: false });
            throw Error(error);
        }
    },
}));