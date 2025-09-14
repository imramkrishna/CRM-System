import React from "react";
import ActionButton from "./ActionButton";
import { Filter as FilterIcon } from "lucide-react";
interface FilterButtonProps {
    onClick: () => void;
    size: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
}
const FilterButton: React.FC<FilterButtonProps> = ({
    onClick,
    size = 'md',
    disabled = false,
    loading = false
}) => {
    return (
        <ActionButton
            onClick={onClick}
            icon={FilterIcon}
            size={size}
            disabled={disabled}
            loading={loading}
            title="Filter"
            variant="secondary"
        />
    );
};

export default FilterButton;