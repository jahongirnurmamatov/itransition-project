import {create} from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials=true;
const API_URL = import.meta.env.MODE ==="http://localhost:4000/api";

export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    
}))