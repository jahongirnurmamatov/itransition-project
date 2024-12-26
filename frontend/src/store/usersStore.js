import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand';

export const useUsersStore = create((set) => ({ 
    users: [],
    isLoading: false,
    error: null,
    totalPages: 1,

    getAllUsers: async (searchKey, page, usernameOrder, emailOrder, createdAtOrder) => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get('/user/get-users', {
                params: {
                    searchKey,
                    page,
                    usernameOrder,
                    emailOrder,
                    createdAtOrder,
                },
            });
            set({ users: res.data.users, isLoading: false, totalPages: res.data.totalPages });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch users.', isLoading: false });
            throw error;
        }
    },

    searchUsers: async (searchKey) => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get('/user/search-users',{params: { query: searchKey }});
            set({ users: res.data.users, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch users.', isLoading: false });
            throw error;
        }
    },

}));