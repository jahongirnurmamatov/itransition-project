import axiosInstance from '@/lib/axiosInstance.js';
import {create} from 'zustand';

export const useResponseStore = create((set) => ({
    response: null,
    isLoading: false,
    error: null,
    isAddingResponse: false,
    responseError: null,
    addResponse: async (templateId, answers) => {
        try {
            set({ isAddingResponse: true, responseError: null });
            const res = await axiosInstance.post(`/response/${templateId}/submit`, { answers });
            set({ response: res.data.response, isAddingResponse: false });    
        } catch (error) {
            set({ responseError: error.response.data.error, isAddingResponse: false });
            throw Error(error);     
        }
    }, 
}));