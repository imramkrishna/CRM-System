'use client';

import React, { useEffect, useState } from 'react';
import { Check, X, AlertTriangle, Info, XCircle } from 'lucide-react';
import { Toast as ToastType, useToast } from '@/contexts/ToastContext';

const getToastConfig = (type: ToastType['type']) => {
    switch (type) {
        case 'success':
            return {
                icon: Check,
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                iconBg: 'bg-green-500',
                textColor: 'text-green-800',
                progressColor: 'bg-green-500'
            };
        case 'error':
            return {
                icon: XCircle,
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200',
                iconBg: 'bg-red-500',
                textColor: 'text-red-800',
                progressColor: 'bg-red-500'
            };
        case 'warning':
            return {
                icon: AlertTriangle,
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200',
                iconBg: 'bg-yellow-500',
                textColor: 'text-yellow-800',
                progressColor: 'bg-yellow-500'
            };
        case 'info':
            return {
                icon: Info,
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
                iconBg: 'bg-blue-500',
                textColor: 'text-blue-800',
                progressColor: 'bg-blue-500'
            };
        default:
            return {
                icon: Info,
                bgColor: 'bg-gray-50',
                borderColor: 'border-gray-200',
                iconBg: 'bg-gray-500',
                textColor: 'text-gray-800',
                progressColor: 'bg-gray-500'
            };
    }
};

interface ToastItemProps {
    toast: ToastType;
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
    const { removeToast } = useToast();
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    
    const config = getToastConfig(toast.type);
    const IconComponent = config.icon;

    useEffect(() => {
        // Trigger animation
        setTimeout(() => setIsVisible(true), 10);

        // Progress bar animation
        if (toast.duration && toast.duration > 0) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    const newProgress = prev - (100 / (toast.duration! / 100));
                    return newProgress <= 0 ? 0 : newProgress;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [toast.duration]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => removeToast(toast.id), 300);
    };

    return (
        <div
            className={`
                relative overflow-hidden rounded-lg border shadow-lg transition-all duration-300 ease-in-out transform
                ${config.bgColor} ${config.borderColor}
                ${isVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : '-translate-y-2 opacity-0 scale-95'
                }
                max-w-sm w-full mx-auto mb-2
            `}
        >
            {/* Progress bar */}
            {toast.duration && toast.duration > 0 && (
                <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
                    <div 
                        className={`h-full transition-all duration-100 ease-linear ${config.progressColor}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            <div className="p-4">
                <div className="flex items-start">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${config.iconBg} flex items-center justify-center mr-3`}>
                        <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${config.textColor}`}>
                            {toast.message}
                        </p>
                    </div>
                    
                    <button
                        onClick={handleClose}
                        className={`flex-shrink-0 ml-4 ${config.textColor} hover:opacity-70 transition-opacity`}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
export const ToastContainer: React.FC = () => {
    const { toasts } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-2">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </div>
    );
};