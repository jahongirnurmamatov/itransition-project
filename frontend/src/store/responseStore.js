import axiosInstance from '@/lib/axiosInstance.js';
import {create} from 'zustand';

export const useResponseStore = create((set) => ({
    response: null,
    responses:[],
    isLoading: false,
    responders: [],
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
    getResponders: async (templateId) => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get(`/response/${templateId}/get-responders`);
            set({ responders: res.data.responses, isLoading: false });
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
}));