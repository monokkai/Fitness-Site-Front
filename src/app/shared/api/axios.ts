import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

const api = axios.create({
    baseURL: API_CONFIG.baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('Server error:', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error('Network error:', {
                status: error.request.status,
                statusText: error.request.statusText,
                readyState: error.request.readyState,
                responseURL: error.request.responseURL
            });
            throw new Error('Network error occurred');
        } else {
            console.error('Error:', error.message);
            throw error;
        }
    }
);

export default api;