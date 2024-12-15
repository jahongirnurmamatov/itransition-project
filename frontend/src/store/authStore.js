import axiosInstance from '@/lib/axiosInstance';
import { Navigate } from 'react-router-dom';
import {create} from 'zustand';

export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signup: async(email,username, password)=>{
        set({isLoading:true, error:null});
        try {
            const res = await axiosInstance.post('/auth/signup', {email, password, username});
            set({user:res.data.user, isAuthenticated:true, isLoading:false});    
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
            throw Error(error);
        }
    },
}))