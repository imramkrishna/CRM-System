'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, X, AlertTriangle, Info, XCircle } from 'lucide-react';
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (message: string, type: ToastType, duration?: number) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const addToast = useCallback((message: string, type: ToastType, duration = 5000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: Toast = { id, message, type, duration };

        setToasts(prev => [...prev, newToast]);

        // Auto remove toast after duration
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const clearToasts = useCallback(() => {
        setToasts([]);
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
            {children}
        </ToastContext.Provider>
    );
};