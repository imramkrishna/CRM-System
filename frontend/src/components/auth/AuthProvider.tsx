'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { restoreAuth, initializeAuth, logout } from '@/lib/slices/authSlice';
import { get } from '@/lib/api';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const dispatch = useAppDispatch();
    const { isInitialized } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const initializeAuthentication = async () => {
            try {
                // Check if we have stored auth data
                const storedUser = localStorage.getItem('auth_user');
                const storedIsAuthenticated = localStorage.getItem('auth_isAuthenticated');

                if (storedUser && storedIsAuthenticated === 'true') {
                    const user = JSON.parse(storedUser);

                    // Verify the stored auth data with the server
                    try {
                        console.log('AuthProvider: Attempting to verify token with backend:', process.env.NEXT_PUBLIC_BACKEND_URL);
                        const response = await get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`);
                        console.log('AuthProvider: Verification response:', response.data);

                        // If verification succeeds, restore the auth state
                        if (response.data.valid) {
                            console.log('AuthProvider: Token is valid, restoring auth');
                            dispatch(restoreAuth({ user, isAuthenticated: true }));
                            return;
                        }
                    } catch (error: any) {
                        // If verification fails, clear stored data
                        console.log('AuthProvider: Token verification failed:', error.response?.data?.message || error.message);
                        console.log('AuthProvider: Error status:', error.response?.status);
                        // Only clear auth if it's actually a 401 (unauthorized) error
                        // Don't clear for network errors or server errors
                        if (error.response?.status === 401) {
                            console.log('AuthProvider: Clearing auth due to 401');
                            localStorage.removeItem('auth_user');
                            localStorage.removeItem('auth_isAuthenticated');
                        } else {
                            // For network errors or server issues, keep the user logged in
                            // but mark as initialized so the app can continue
                            console.log('AuthProvider: Keeping user logged in despite error');
                            dispatch(restoreAuth({ user, isAuthenticated: true }));
                            return;
                        }
                    }
                }

                // If no stored data or verification failed, clear everything
                localStorage.removeItem('auth_user');
                localStorage.removeItem('auth_isAuthenticated');
                dispatch(initializeAuth());

            } catch (error) {
                console.error('Error initializing authentication:', error);
                dispatch(initializeAuth());
            }
        };

        if (!isInitialized) {
            initializeAuthentication();
        }
    }, [dispatch, isInitialized]);

    // Show loading until auth is initialized
    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return <>{children}</>;
};
