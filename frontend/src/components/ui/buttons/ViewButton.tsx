import React from 'react';
import { Eye } from 'lucide-react';
import ActionButton from './ActionButton';

interface ViewButtonProps {
    onClick: () => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
}

const ViewButton: React.FC<ViewButtonProps> = ({ onClick, size, disabled, loading }) => {
    return (
        <ActionButton
            onClick={onClick}
            icon={Eye}
            title="View Details"
            variant="view"
            size={size}
            disabled={disabled}
            loading={loading}
        />
    );
};

export default ViewButton;