import axios from "axios"; 

const axiosInstance = axios.create({
  baseURL: 'https://itransition-project-is0a.onrender.com/api',
  withCredentials: true 
});

export default axiosInstance;