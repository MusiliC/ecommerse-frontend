import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, 
  withCredentials: true
});


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Error cookies:", document.cookie);
    return Promise.reject(error);
  }
);

export default api;