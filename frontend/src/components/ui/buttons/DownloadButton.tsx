import React from "react";
import { Download as DownloadIcon } from "lucide-react";
import ActionButton from "./ActionButton";
interface DownloadButtonProps {
    onClick: () => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
}
const DownloadButton: React.FC<DownloadButtonProps> = ({
    onClick,
    size = 'md',
    disabled = false,
    loading = false
}) => {
    return (
        <ActionButton
            onClick={onClick}
            icon={DownloadIcon}
            title="Download"
            variant="primary"
            size={size}
            disabled={disabled}
            loading={loading}
        />
    );
};

export default DownloadButton;
