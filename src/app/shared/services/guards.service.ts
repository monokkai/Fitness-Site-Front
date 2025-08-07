import axios from 'axios';

const GUARDS_SERVICE_URL = process.env.NEXT_PUBLIC_GUARDS_SERVICE_URL || 'http://localhost:3003';

interface ValidationResponse {
    valid: boolean;
    user?: {
        id: number;
        email: string;
        roles: string[];
    };
    message?: string;
}

export class GuardsService {
    private static async validateToken(token: string): Promise<ValidationResponse> {
        try {
            const response = await axios.post<ValidationResponse>(`${GUARDS_SERVICE_URL}/auth/validate-token`, { token });
            return response.data;
        } catch (error: any) {
            return {
                valid: false,
                message: error.response?.data?.message || 'Token validation failed',
            };
        }
    }

    private static async validateRole(token: string, role: string): Promise<ValidationResponse> {
        try {
            const response = await axios.post<ValidationResponse>(`${GUARDS_SERVICE_URL}/auth/validate-role`, { token, role });
            return response.data;
        } catch (error: any) {
            return {
                valid: false,
                message: error.response?.data?.message || 'Role validation failed',
            };
        }
    }

    private static async validateRoute(token: string, route: string): Promise<ValidationResponse> {
        try {
            const response = await axios.post<ValidationResponse>(`${GUARDS_SERVICE_URL}/auth/validate-route`, { token, route });
            return response.data;
        } catch (error: any) {
            return {
                valid: false,
                message: error.response?.data?.message || 'Route validation failed',
            };
        }
    }

    static async checkAccess(route: string): Promise<ValidationResponse> {
        const token = localStorage.getItem('token');
        if (!token) {
            return { valid: false, message: 'No token found' };
        }
        return this.validateRoute(token, route);
    }

    static async checkRole(role: string): Promise<ValidationResponse> {
        const token = localStorage.getItem('token');
        if (!token) {
            return { valid: false, message: 'No token found' };
        }
        return this.validateRole(token, role);
    }

    static async isAuthenticated(): Promise<boolean> {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        const result = await this.validateToken(token);
        return result.valid;
    }
}
