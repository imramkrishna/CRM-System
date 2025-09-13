import React from "react";
import ActionButton from "./ActionButton";
import { TrashIcon } from "lucide-react";

interface DeleteButtonProps {
    onClick: () => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    onClick,
    size = 'md',
    disabled = false,
    loading = false
}) => {
    return (
        <ActionButton
            onClick={onClick}
            icon={TrashIcon}
            title="Delete"
            variant="delete"
            size={size}
            disabled={disabled}
            loading={loading}
        />
    );
};

export default DeleteButton;
