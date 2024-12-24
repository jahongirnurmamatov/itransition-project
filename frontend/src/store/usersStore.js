import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand';

export const useUsersStore = create((set) => ({ 
    users: [],
    isLoading: false,
    error: null,
    getAllUsers: async () => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get('/user/get-users');
            set({ users: res.data.users, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch users.', isLoading: false });
            throw error;
        }
    },

}));