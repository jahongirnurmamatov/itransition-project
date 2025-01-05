import axiosInstance from '@/lib/axiosInstance';
import { create } from 'zustand';

export const useTagStore = create((set) => ({
  tags: [],
  isLoading: false,
  error: null,
  getTags: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.get('/tag/get-tags');
      set({ tags: res.data.tags, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Error fetching tags',
        isLoading: false,
      });
    }
  },
}));
