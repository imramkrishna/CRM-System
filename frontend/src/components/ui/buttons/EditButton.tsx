import React from 'react';
import { Edit } from 'lucide-react';
import ActionButton from './ActionButton';

interface EditButtonProps {
    onClick: () => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, size, disabled, loading }) => {
    return (
        <ActionButton
            onClick={onClick}
            icon={Edit}
            title="Edit"
            variant="edit"
            size={size}
            disabled={disabled}
            loading={loading}
        />
    );
};

export default EditButton;