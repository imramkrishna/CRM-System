import { useToast } from '@/contexts/ToastContext';

export const useCommonToasts = () => {
    const { addToast } = useToast();

    return {
        // Authentication toasts
        showLoginSuccess: () => addToast('Login successful!', 'success'),
        showLogoutSuccess: () => addToast('Logged out successfully', 'success'),
        showLoginError: () => addToast('Login failed. Please check your credentials.', 'error'),
        
        // Product management toasts
        showProductAdded: (productName?: string) => 
            addToast(`Product ${productName ? `"${productName}" ` : ''}added successfully`, 'success'),
        showProductUpdated: (productName?: string) => 
            addToast(`Product ${productName ? `"${productName}" ` : ''}updated successfully`, 'success'),
        showProductDeleted: (productName?: string) => 
            addToast(`Product ${productName ? `"${productName}" ` : ''}deleted successfully`, 'success'),
        showProductError: (action: string) => 
            addToast(`Failed to ${action} product. Please try again.`, 'error'),
        
        // Order management toasts
        showOrderPlaced: (orderNumber?: string) => 
            addToast(`Order ${orderNumber ? `#${orderNumber} ` : ''}placed successfully`, 'success'),
        showOrderUpdated: (orderNumber?: string) => 
            addToast(`Order ${orderNumber ? `#${orderNumber} ` : ''}updated successfully`, 'success'),
        showOrderCancelled: (orderNumber?: string) => 
            addToast(`Order ${orderNumber ? `#${orderNumber} ` : ''}cancelled successfully`, 'success'),
        showOrderError: (action: string) => 
            addToast(`Failed to ${action} order. Please try again.`, 'error'),
        
        // Distributor management toasts
        showDistributorAdded: (distributorName?: string) => 
            addToast(`Distributor ${distributorName ? `"${distributorName}" ` : ''}added successfully`, 'success'),
        showDistributorUpdated: (distributorName?: string) => 
            addToast(`Distributor ${distributorName ? `"${distributorName}" ` : ''}updated successfully`, 'success'),
        showDistributorApproved: (distributorName?: string) => 
            addToast(`Distributor ${distributorName ? `"${distributorName}" ` : ''}approved successfully`, 'success'),
        showDistributorRejected: (distributorName?: string) => 
            addToast(`Distributor ${distributorName ? `"${distributorName}" ` : ''}rejected`, 'info'),
        showDistributorError: (action: string) => 
            addToast(`Failed to ${action} distributor. Please try again.`, 'error'),
        
        // File operations toasts
        showDownloadSuccess: (fileName?: string) => 
            addToast(`${fileName ? `${fileName} ` : 'File '}downloaded successfully`, 'success'),
        showUploadSuccess: (fileName?: string) => 
            addToast(`${fileName ? `${fileName} ` : 'File '}uploaded successfully`, 'success'),
        showFileError: (action: string) => 
            addToast(`Failed to ${action} file. Please try again.`, 'error'),
        
        // Generic toasts
        showSuccess: (message: string) => addToast(message, 'success'),
        showError: (message: string) => addToast(message, 'error'),
        showWarning: (message: string) => addToast(message, 'warning'),
        showInfo: (message: string) => addToast(message, 'info'),
        
        // Network/API toasts
        showNetworkError: () => addToast('Network error. Please check your connection.', 'error'),
        showUnauthorizedError: () => addToast('Session expired. Please log in again.', 'warning'),
        showServerError: () => addToast('Server error. Please try again later.', 'error'),
        
        // Form validation toasts
        showValidationError: (field?: string) => 
            addToast(`${field ? `${field} ` : 'Form '}validation failed. Please check your input.`, 'warning'),
        showSaveSuccess: () => addToast('Changes saved successfully', 'success'),
        showSaveError: () => addToast('Failed to save changes. Please try again.', 'error'),
    };
};
