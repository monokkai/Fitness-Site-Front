import axios from 'axios';
import { API_URL } from '../config/api.config';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) {
            console.error('Network Error:', error);
            throw new Error('Network error - please check your connection');
        }

        if (error.response.status === 401) {
            localStorage.removeItem('token');
        }

        return Promise.reject(error);
    }
);

export default api;