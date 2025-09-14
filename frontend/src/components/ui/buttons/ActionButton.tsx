import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
    onClick: () => void;
    icon: LucideIcon;
    title: string;
    variant?: 'view' | 'edit' | 'delete' | 'add' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    onClick,
    icon: Icon,
    title,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'view':
                return 'text-green-600 hover:text-blue-900 hover:bg-blue-50 border-blue-200';
            case 'edit':
                return 'text-purple-600 hover:text-indigo-900 hover:bg-indigo-50 border-indigo-200';
            case 'delete':
                return 'text-red-600 hover:text-red-900 hover:bg-red-50 border-red-200';
            case 'add':
                return 'text-green-600 hover:text-green-900 hover:bg-green-50 border-green-200';
            case 'primary':
                return 'text-blue-600 hover:text-blue-900 hover:bg-blue-50 border-blue-200';
            case 'secondary':
                return 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-gray-200';
            default:
                return 'text-blue-600 hover:text-blue-900 hover:bg-blue-50 border-blue-200';
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'p-1';
            case 'md':
                return 'p-2';
            case 'lg':
                return 'p-3';
            default:
                return 'p-2';
        }
    };

    const getIconSize = () => {
        switch (size) {
            case 'sm':
                return 'h-3 w-3';
            case 'md':
                return 'h-4 w-4';
            case 'lg':
                return 'h-5 w-5';
            default:
                return 'h-4 w-4';
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                ${getVariantClasses()}
                ${getSizeClasses()}
                border rounded transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                relative
            `}
            title={title}
        >
            {loading ? (
                <div className={`animate-spin rounded-full border-b-2 border-current ${getIconSize()}`} />
            ) : (
                <Icon className={getIconSize()} />
            )}
        </button>
    );
};

export default ActionButton;