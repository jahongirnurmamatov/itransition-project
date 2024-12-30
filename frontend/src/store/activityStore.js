import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand';

export const useActivityStore = create((set) => ({
    activities: [],
    isLoading: false,
    error: null,
    isAddingActivity: false,
    activityError: null,
    getRecentActivities: async (userId) => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get(`/activity/${userId}/get-activity`);
            set({ activities: res.data.activities, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.error, isLoading: false });
            throw Error(error);
        }
    },
}))