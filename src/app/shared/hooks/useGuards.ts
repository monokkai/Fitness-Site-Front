import { useCallback } from 'react';
import { GuardsService } from '../services/guards.service';
import { useRouter } from 'next/navigation';

export const useGuards = () => {
    const router = useRouter();

    const checkAccess = useCallback(async (route: string) => {
        try {
            const result = await GuardsService.checkAccess(route);
            if (!result.valid) {
                router.push('/auth');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Access check failed:', error);
            router.push('/auth');
            return false;
        }
    }, [router]);

    const checkRole = useCallback(async (role: string) => {
        try {
            const result = await GuardsService.checkRole(role);
            if (!result.valid) {
                router.push('/auth');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Role check failed:', error);
            router.push('/auth');
            return false;
        }
    }, [router]);

    const isAuthenticated = useCallback(async () => {
        try {
            return await GuardsService.isAuthenticated();
        } catch (error) {
            console.error('Auth check failed:', error);
            return false;
        }
    }, []);

    return {
        checkAccess,
        checkRole,
        isAuthenticated
    };
};
