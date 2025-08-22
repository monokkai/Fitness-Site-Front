// export const API_URL = 'http://localhost:5001/api';
// // export const API_URL = 'http://localhost:8000';
// export const GUARDS_SERVICE_URL = 'http://localhost:3003';
// export const TRAINING_URL = 'http://localhost:5002'

// export const API_URL = 'http://localhost:5001';
// export const GUARDS_SERVICE_URL = 'http://localhost:5001';
// export const TRAINING_URL = 'http://localhost:5001';
export const API_URL = 'http://localhost:5001';
export const TRAINING_URL = API_URL

export const AUTH_ENDPOINTS = {
    LOGIN: `${API_URL}/api/auth/login`,
    SIGNUP: `${API_URL}/api/auth/register`,
    LOGOUT: `${API_URL}/api/auth/logout`,
    REFRESH: `${API_URL}/api/auth/refresh`,
    ME: `${API_URL}/api/auth/me`,
    PROFILE: `${API_URL}/api/auth/profile`,
} as const;

export const GUARDS_ENDPOINTS = {
    VALIDATE_TOKEN: `${API_URL}/auth/validate-token`,
    VALIDATE_ROLE: `${API_URL}/auth/validate-role`,
    VALIDATE_ROUTE: `${API_URL}/auth/validate-route`,
} as const;

export const TRAINING_ENDPOINTS = {
    USER_PROFILES: `${API_URL}/user-profiles`,
    WORKOUTS: `${API_URL}/workouts`,
    USER_WORKOUTS: `${API_URL}/user-workouts`,
} as const;

export const COOKIE_ENDPOINTS = {
    SET: `${API_URL}/cookie/set`,
    CLEAR: `${API_URL}/cookie/clear`,
    CLIENT_DATA: `${API_URL}/cookie/client-data`,
} as const;
