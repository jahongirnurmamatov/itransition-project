import axios from "axios"; 

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api' : 'https://itransition-project-is0a.onrender.com/api',
  withCredentials: true 
});

export default axiosInstance;