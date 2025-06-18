'use client';

import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import api from '../api/axios';
import { IAuthResponse } from '../interfaces/IUser';

export const useSession = () => {
    const { setUser } = useUserStore();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await api.get<IAuthResponse>('/auth/me');
                if (response.data.success && response.data.user) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Session check failed:', error);
                setUser(null);
            }
        };

        checkSession();
    }, [setUser]);
}; 