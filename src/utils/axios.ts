import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { toast } from '@/utils/helpers.ts';

const axiosInstance = axios.create({
    baseURL: 'https://your-api-base-url.com', // Replace with your API base URL
});

axiosInstance.interceptors.request.use((config) => {
    const { token } = useAuthStore();

    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(val => val, err => {
    if (err.code === AxiosError.ERR_NETWORK) {
        toast({ titleText: 'Network Error! Service Unavailable.', icon: 'error' });
    }

    return Promise.reject(err);
});

export default axiosInstance;
