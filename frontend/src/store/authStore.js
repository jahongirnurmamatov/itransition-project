import axiosInstance from '@/lib/axiosInstance';
import {create} from 'zustand';

export const useAuthStore = create((set)=>({
    authUser:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    setAuthUser:(authUser)=>set({authUser}),

    signup: async(email,username, password)=>{
        set({isLoading:true, error:null});
        try {
            const res = await axiosInstance.post('/auth/signup', {email, password, username});
            set({authUser:res.data.user, isAuthenticated:true, isLoading:false});    
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
            throw Error(error);
        }
    },
    login:async(email,password)=>{
        set({isLoading:true, error:null});
        try {
            const res = await axiosInstance.post(`/auth/login`, {email, password});
            set({authUser:res.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
            throw Error(error);
        }
    }, 
    logout:async()=>{
        set({isLoading:true, error:null});
        try {
            await axiosInstance.post(`/auth/logout`);
            set({authUser:null, isAuthenticated:false, isLoading:false});
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
            throw Error(error);
        }
    },

    checkAuth: async()=>{
        set({isCheckingAuth:true, error:null});
        try {
            const res = await axiosInstance.get(`/auth/check-auth`);
            set({authUser:res.data.user, isAuthenticated:true, isLoading:false, isCheckingAuth:false});
        } catch (error) {
            set({error:null, isCheckingAuth:false});
        }
    },
   
}))