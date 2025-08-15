'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
    Calendar,
    CheckCircle,
    XCircle,
    Package,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    Clock,
    AlertTriangle,
    RefreshCw,
    ArrowUpDown,
    Download,
    Plus,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    FileText
} from 'lucide-react';
import { get, put, del } from '@/lib/api';
import OrderDetails from './OrderDetails';

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

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [dateFilter, setDateFilter] = useState('ALL');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    // Fetch orders from backend
    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const response = await get('/distributor/get-orders', {
                withCredentials: true
            });
            
            // Ensure we always set an array
            const ordersData = Array.isArray(response.data) ? response.data : [];
            setOrders(ordersData);
            setFilteredOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Set empty arrays on error
            setOrders([]);
            setFilteredOrders([]);
            alert('Failed to fetch orders. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Filter and search logic
    useEffect(() => {
        // Ensure orders is always an array
        if (!Array.isArray(orders)) {
            setFilteredOrders([]);
            return;
        }

        let filtered = [...orders];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (order.orderItems && Array.isArray(order.orderItems) && 
                    order.orderItems.some(item => 
                        item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.productSku?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                )
            );
        }

        // Status filter
        if (statusFilter !== 'ALL') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Date filter
        if (dateFilter !== 'ALL') {
            const now = new Date();
            const cutoffDate = new Date();
            
            switch (dateFilter) {
                case 'TODAY':
                    cutoffDate.setHours(0, 0, 0, 0);
                    filtered = filtered.filter(order => new Date(order.createdAt) >= cutoffDate);
                    break;
                case 'WEEK':
                    cutoffDate.setDate(now.getDate() - 7);
                    filtered = filtered.filter(order => new Date(order.createdAt) >= cutoffDate);
                    break;
                case 'MONTH':
                    cutoffDate.setMonth(now.getMonth() - 1);
                    filtered = filtered.filter(order => new Date(order.createdAt) >= cutoffDate);
                    break;
            }
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue, bValue;
            
            switch (sortBy) {
                case 'orderNumber':
                    aValue = a.orderNumber || '';
                    bValue = b.orderNumber || '';
                    break;
                case 'totalAmount':
                    aValue = parseFloat(a.totalAmount || '0');
                    bValue = parseFloat(b.totalAmount || '0');
                    break;
                case 'status':
                    aValue = a.status || '';
                    bValue = b.status || '';
                    break;
                default:
                    aValue = new Date(a.createdAt || 0);
                    bValue = new Date(b.createdAt || 0);
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredOrders(filtered);
        setCurrentPage(1);
    }, [orders, searchTerm, statusFilter, dateFilter, sortBy, sortOrder]);

    // Get status color and icon
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

    // Handle order operations
    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setShowOrderDetails(true);
    };

    const handleUpdateOrder = (updatedOrder: Order) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === updatedOrder.id ? updatedOrder : order
            )
        );
    };

    const handleCancelOrder = async (orderId: string) => {
        try {
            await del(`/distributor/cancel-order/${orderId}`, {
                withCredentials: true
            });
            
            // Update order status locally
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId ? { ...order, status: 'CANCELLED' } : order
                )
            );
            
            alert('Order cancelled successfully!');
        } catch (error) {
            console.error('Error cancelling order:', error);
            alert('Failed to cancel order. Please try again.');
            throw error;
        }
    };

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    // Pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    // Ensure filteredOrders is an array before slicing
    const currentOrders = Array.isArray(filteredOrders) 
        ? filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
        : [];
    const totalPages = Array.isArray(filteredOrders) 
        ? Math.ceil(filteredOrders.length / ordersPerPage)
        : 0;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="flex items-center space-x-2">
                    <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                    <span className="text-lg text-gray-600">Loading orders...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-600 mt-1">
                        Manage your orders and track their status
                    </p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                    <RefreshCw className="h-4 w-4" />
                    <span>Refresh</span>
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All Status</option>
                        <option value="DRAFT">Draft</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                    </select>

                    {/* Date Filter */}
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    >
                        <option value="ALL">All Time</option>
                        <option value="TODAY">Today</option>
                        <option value="WEEK">Last 7 Days</option>
                        <option value="MONTH">Last Month</option>
                    </select>

                    {/* Sort */}
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={`${sortBy}-${sortOrder}`}
                        onChange={(e) => {
                            const [field, order] = e.target.value.split('-');
                            setSortBy(field);
                            setSortOrder(order as 'asc' | 'desc');
                        }}
                    >
                        <option value="createdAt-desc">Newest First</option>
                        <option value="createdAt-asc">Oldest First</option>
                        <option value="orderNumber-asc">Order Number A-Z</option>
                        <option value="orderNumber-desc">Order Number Z-A</option>
                        <option value="totalAmount-desc">Highest Amount</option>
                        <option value="totalAmount-asc">Lowest Amount</option>
                        <option value="status-asc">Status A-Z</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('orderNumber')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Order Number</span>
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('totalAmount')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Total Amount</span>
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('status')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Status</span>
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('createdAt')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Created Date</span>
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg">No orders found</p>
                                        <p className="text-gray-400 text-sm">Try adjusting your filters or search terms</p>
                                    </td>
                                </tr>
                            ) : (
                                currentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <Package className="h-5 w-5 text-blue-600" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {order.orderNumber}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {order.id.slice(0, 8)}...
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {Array.isArray(order.orderItems) ? order.orderItems.length : 0} item{(Array.isArray(order.orderItems) ? order.orderItems.length : 0) !== 1 ? 's' : ''}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {Array.isArray(order.orderItems) 
                                                    ? order.orderItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
                                                    : 0
                                                } total qty
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                ${parseFloat(order.totalAmount).toFixed(2)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Subtotal: ${parseFloat(order.subTotal).toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span>{order.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                                            <div>{new Date(order.createdAt).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleViewOrder(order)}
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                {(order.status === 'DRAFT' || order.status === 'PENDING') && (
                                                    <>
                                                        <button
                                                            onClick={() => handleViewOrder(order)}
                                                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                                            title="Edit Order"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleCancelOrder(order.id)}
                                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                            title="Cancel Order"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(indexOfLastOrder, Array.isArray(filteredOrders) ? filteredOrders.length : 0)}
                                    </span>{' '}
                                    of <span className="font-medium">{Array.isArray(filteredOrders) ? filteredOrders.length : 0}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => paginate(pageNumber)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    currentPage === pageNumber
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <OrderDetails
                    order={selectedOrder}
                    isOpen={showOrderDetails}
                    onClose={() => {
                        setShowOrderDetails(false);
                        setSelectedOrder(null);
                    }}
                    onUpdate={handleUpdateOrder}
                    onCancel={handleCancelOrder}
                />
            )}
        </div>
    );
};

export default Orders;
