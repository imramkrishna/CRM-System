import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'distributor';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    isInitialized: boolean; // Add this to track if auth state has been loaded
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isInitialized: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            console.log('AuthSlice: Login success, storing user:', action.payload);
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.isInitialized = true;

            // Persist to localStorage
            if (typeof window !== 'undefined') {
                console.log('AuthSlice: Storing to localStorage');
                localStorage.setItem('auth_user', JSON.stringify(action.payload));
                localStorage.setItem('auth_isAuthenticated', 'true');
                console.log('AuthSlice: Stored user data:', localStorage.getItem('auth_user'));
            }
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
            state.isInitialized = true;

            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_user');
                localStorage.removeItem('auth_isAuthenticated');
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.isInitialized = true;

            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_user');
                localStorage.removeItem('auth_isAuthenticated');
            }
        },
        clearError: (state) => {
            state.error = null;
        },
        restoreAuth: (state, action: PayloadAction<{ user: User; isAuthenticated: boolean }>) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.isInitialized = true;
            state.loading = false;
        },
        initializeAuth: (state) => {
            state.isInitialized = true;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, restoreAuth, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
