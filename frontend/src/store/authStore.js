import {create} from 'zustand';

export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signup: async(email,password, name)=>{
        set({isLoading:true, error:null});
        try {
            const res = await axios.post(`/auth/signup`, {email, password, name});
            set({user:res.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
            throw Error(error);
        }
    },
}))