export const API_URL = 'http://localhost:5001/api';
export const GUARDS_SERVICE_URL = 'http://localhost:3003';

export const AUTH_ENDPOINTS = {
    LOGIN: `${API_URL}/auth/login`,
    SIGNUP: `${API_URL}/auth/register`,
    LOGOUT: `${API_URL}/auth/logout`,
    REFRESH: `${API_URL}/auth/refresh`,
    ME: `${API_URL}/auth/me`,
    PROFILE: `${API_URL}/auth/profile`,
} as const;

export const GUARDS_ENDPOINTS = {
    VALIDATE_TOKEN: `${GUARDS_SERVICE_URL}/auth/validate-token`,
    VALIDATE_ROLE: `${GUARDS_SERVICE_URL}/auth/validate-role`,
    VALIDATE_ROUTE: `${GUARDS_SERVICE_URL}/auth/validate-route`,
} as const; 