import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand';

export const useUsersStore = create((set,get) => ({ 
    users: [],
    isLoading: false,
    error: null,
    totalPages: 1,
    user: null,

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
            await get().getAllUsers()
            set({ users: res.data.users, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch users.', isLoading: false });
            throw error;
        }
    },

    deleteUsers:async(userIds)=>{
        try {
            const res = await axiosInstance.delete('/user/delete', {data:{userIds}});
            await get().getAllUsers()
            set({ isLoading: false});    
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to delete users.', isLoading: false });    
            throw error;
        }
    },
    blockUsers: async (userIds) => {
        try {
            const res = await axiosInstance.put('/user/block', { userIds });
            await get().getAllUsers()
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to block users.', isLoading: false });
            throw error;
        }
    },
    unBlockUsers: async (userIds) => {
        try {
            const res = await axiosInstance.put('/user/unblock', { userIds });
            await get().getAllUsers()
            set({ isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to unblock users.', isLoading: false });
            throw error;
        }
    },


    getUserById: async (userId) => {
        try {
            set({ isLoading: true, error: null });
            const res = await axiosInstance.get(`/user/${userId}`);
            set({ user: res.data.user, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch user.', isLoading: false });
            throw error;
        }
    },
    userRoleChange: async (userId, role) => {
        try {
            const res = await axiosInstance.post("/user/role-change", { userId, role });
            if (res.data.success) {
                set({ user: res.data.user });
            }
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
}));