import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const axiosInstance = axios.create({
    baseURL: 'https://your-api-base-url.com', // Replace with your API base URL
});

axiosInstance.interceptors.request.use((config) => {
    const { token } = useAuthStore()

    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
