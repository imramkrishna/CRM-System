import {
    X,
    Package,
    Calendar,
    FileText,
    DollarSign,
    Edit2,
    Save,
    Trash2,
    User,
    Clock,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Loader2,
    RefreshCw
} from 'lucide-react';
import { useState } from 'react';
import { put, del } from '@/lib/api';

interface OrderItem {
    id: string;
    orderId: string;
    productId: number;
    quantity: number;
    unitPrice: string;
    listPrice: string;
    discountPercent: string;
    discountAmount: string;
    lineTotal: string;
    productSku: string;
    productName: string;
    productDescription: string;
    productBrand: string;
    productCategory: string;
    notes: string | null;
    requestedDeliveryDate: string | null;
    quantityFulfilled: number;
    fulfilledAt: string | null;
    createdAt: string;
    updatedAt: string;
}

interface Order {
    id: string;
    orderNumber: string;
    distributorId: number;
    status: string;
    subTotal: string;
    taxAmount: string;
    discountAmount: string;
    totalAmount: string;
    notes: string | null;
    internalNotes: string | null;
    requestedDeliveryDate: string | null;
    approvedAt: string | null;
    rejectedAt: string | null;
    rejectionReason: string | null;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];
}

interface OrderDetailsProps {
    order: Order;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (updatedOrder: Order) => void;
    onCancel: (orderId: string) => void;
}

const OrderDetails = ({ order, isOpen, onClose, onUpdate, onCancel }: OrderDetailsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedOrder, setEditedOrder] = useState(order);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DRAFT': return 'bg-gray-100 text-gray-800';
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'APPROVED': return 'bg-green-100 text-green-800';
            case 'REJECTED': return 'bg-red-100 text-red-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            case 'PROCESSING': return 'bg-blue-100 text-blue-800';
            case 'SHIPPED': return 'bg-indigo-100 text-indigo-800';
            case 'DELIVERED': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'APPROVED': return <CheckCircle className="h-4 w-4" />;
            case 'REJECTED': 
            case 'CANCELLED': return <XCircle className="h-4 w-4" />;
            case 'PENDING': return <Clock className="h-4 w-4" />;
            case 'PROCESSING': return <RefreshCw className="h-4 w-4" />;
            default: return <Package className="h-4 w-4" />;
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await put(`/distributor/update-order/${order.id}`, {
                notes: editedOrder.notes,
                requestedDeliveryDate: editedOrder.requestedDeliveryDate
            }, {
                withCredentials: true
            });

            onUpdate(response.data);
            setIsEditing(false);
            alert('Order updated successfully!');
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Failed to update order. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm('Are you sure you want to cancel this order?')) {
            return;
        }

        setIsDeleting(true);
        try {
            await onCancel(order.id);
            onClose();
        } catch (error) {
            console.error('Error cancelling order:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200 my-4">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                            <Package className="h-8 w-8 text-blue-600" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h2>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        <span>{order.status}</span>
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        Created: {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {/* Order Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Order Summary */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">Order Number</p>
                                        <p className="font-medium">{order.orderNumber}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">Status</p>
                                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span>{order.status}</span>
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">Created Date</p>
                                        <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">Last Updated</p>
                                        <p className="font-medium">{new Date(order.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                                <div className="space-y-4">
                                    {order.orderItems.map((item, index) => (
                                        <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                                            {item.productSku}
                                                        </span>
                                                        <span className="text-gray-500 text-sm">{item.productCategory}</span>
                                                    </div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">{item.productName}</h4>
                                                    <p className="text-sm text-gray-600 mb-3">{item.productDescription}</p>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-gray-500">Brand:</span>
                                                            <span className="ml-1 font-medium">{item.productBrand}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Quantity:</span>
                                                            <span className="ml-1 font-medium">{item.quantity}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Unit Price:</span>
                                                            <span className="ml-1 font-medium">${parseFloat(item.unitPrice).toFixed(2)}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Line Total:</span>
                                                            <span className="ml-1 font-medium text-blue-600">${parseFloat(item.lineTotal).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Details & Actions */}
                        <div className="space-y-6">
                            {/* Financial Summary */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">${parseFloat(order.subTotal).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax:</span>
                                        <span className="font-medium">${parseFloat(order.taxAmount).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Discount:</span>
                                        <span className="font-medium">-${parseFloat(order.discountAmount).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-blue-200 pt-3">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-900">Total:</span>
                                            <span className="font-bold text-blue-600 text-xl">${parseFloat(order.totalAmount).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Editable Order Details */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                                    {!isEditing && (order.status === 'DRAFT' || order.status === 'PENDING') && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-blue-600 hover:text-blue-800 p-1"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {/* Notes */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Order Notes
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                value={editedOrder.notes || ''}
                                                onChange={(e) => setEditedOrder(prev => ({ ...prev, notes: e.target.value }))}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Add order notes..."
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white p-3 rounded border">
                                                {order.notes || 'No notes added'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Requested Delivery Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Requested Delivery Date
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                value={editedOrder.requestedDeliveryDate?.split('T')[0] || ''}
                                                onChange={(e) => setEditedOrder(prev => ({ 
                                                    ...prev, 
                                                    requestedDeliveryDate: e.target.value ? `${e.target.value}T00:00:00.000Z` : null 
                                                }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white p-3 rounded border">
                                                {order.requestedDeliveryDate 
                                                    ? new Date(order.requestedDeliveryDate).toLocaleDateString()
                                                    : 'No delivery date specified'
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Edit Actions */}
                                {isEditing && (
                                    <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 disabled:opacity-50"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span>Saving...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="h-4 w-4" />
                                                    <span>Save Changes</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditedOrder(order);
                                            }}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            {!isEditing && (order.status === 'DRAFT' || order.status === 'PENDING') && (
                                <div className="space-y-3">
                                    <button
                                        onClick={handleCancel}
                                        disabled={isDeleting}
                                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2 disabled:opacity-50"
                                    >
                                        {isDeleting ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span>Cancelling...</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5" />
                                                <span>Cancel Order</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
