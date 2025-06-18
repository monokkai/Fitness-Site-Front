'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import api from '../api/axios';
import { IAuthResponse } from '../interfaces/IUser';

export const useSession = () => {
    const { setUser } = useUserStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await api.get<IAuthResponse>('/auth/me');
                console.log('Session response:', response.data);

                if (response.data.success && response.data.user) {
                    setUser(response.data.user);
                } else {
                    console.log('No active session found');
                    setUser(null);
                }
            } catch (error) {
                console.error('Session check failed:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [setUser]);

    return { isLoading };
}; 