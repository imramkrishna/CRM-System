import {
    ShoppingCart,
    Search,
    DollarSign,
    Plus,
    Filter,
    Download,
    Eye,
    Edit,
    Check,
    Clock,
    ArrowUpRight,
    X,
    Package,
    Calendar,
    User,
    Phone,
    Mail,
    MapPin
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { get, put, post } from '@/lib/api';
import EditButton from '../ui/buttons/EditButton';
import ViewButton from '../ui/buttons/ViewButton';
import DownloadButton from '../ui/buttons/DownloadButton';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    order: {
        distributor: {
            id: number;
            ownerName: string;
            companyName: string;
            email: string;
            phone: string;
            address: string;
        }
    }
}

interface GroupedOrder {
    orderId: string;
    items: OrderItem[];
    totalAmount: number;
    itemCount: number;
    productSummary: string;
    status: string;
    createdAt: string;
    isFulfilled: boolean;
    distributor: {
        id: number;
        ownerName: string;
        companyName: string;
        email: string;
        phone: string;
        address: string;
    }
}

interface ProductFormData {
    sku: string;
    barcode: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    color: string;
    listPrice: number | '';
    costPrice: number | '';
    stockQuantity: number | '';
    reservedQuantity: number | '';
    minOrderQuantity: number | '';
    maxOrderQuantity: number | '';
    weight: number | '';
    dimensions: {
        length: number | '';
        width: number | '';
        height: number | '';
        unit: string;
    };
    isActive: boolean;
    isDiscontinued: boolean;
    dateOfManufacture: string;
    dateOfExpiry: string;
}

const Orders = () => {
    const [searchQueries, setSearchQueries] = useState({
        orders: ''
    });
    const [orderDetails, setOrderDetails] = useState<OrderItem[]>([]);
    const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<GroupedOrder | null>(null);
    const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [editFormData, setEditFormData] = useState({
        status: '',
        notes: '',
        requestedDeliveryDate: ''
    });

    // Product form data
    const [productFormData, setProductFormData] = useState<ProductFormData>({
        sku: '',
        barcode: '',
        name: '',
        description: '',
        category: '',
        brand: '',
        color: '',
        listPrice: '',
        costPrice: '',
        stockQuantity: '',
        reservedQuantity: 0,
        minOrderQuantity: 1,
        maxOrderQuantity: '',
        weight: '',
        dimensions: {
            length: '',
            width: '',
            height: '',
            unit: 'cm'
        },
        isActive: true,
        isDiscontinued: false,
        dateOfManufacture: '',
        dateOfExpiry: ''
    });

    const handleSearchChange = (section: string, value: string) => {
        setSearchQueries(prev => ({
            ...prev,
            [section]: value
        }));
    };

    const groupOrdersByOrderId = (orderItems: OrderItem[]): GroupedOrder[] => {
        const grouped = orderItems.reduce((acc, item) => {
            if (!acc[item.orderId]) {
                acc[item.orderId] = [];
            }
            acc[item.orderId].push(item);
            return acc;
        }, {} as Record<string, OrderItem[]>);

        return Object.entries(grouped).map(([orderId, items]) => {
            const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.lineTotal), 0);
            const productSummary = items.slice(0, 2).map(item => item.productName).join(', ') +
                (items.length > 2 ? ` +${items.length - 2} more` : '');
            const isFulfilled = items.every(item => item.quantityFulfilled === item.quantity);
            const status = isFulfilled ? 'DELIVERED' : 'PENDING';
            const distributor = items[0].order.distributor; // Get distributor from first item

            return {
                orderId,
                items,
                totalAmount,
                itemCount: items.length,
                productSummary,
                status,
                createdAt: items[0].createdAt,
                isFulfilled,
                distributor
            };
        }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    };

    const getOrderNumber = (orderId: string) => {
        // Extract a readable order number from the ID
        const orderIndex = groupedOrders.findIndex(order => order.orderId === orderId) + 1;
        return `HST-2024-${orderIndex.toString().padStart(3, '0')}`;
    };

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await get("/admin/getOrders", {
                withCredentials: true
            });

            if (response.data && response.data.orderDetails) {
                setOrderDetails(response.data.orderDetails);
                const grouped = groupOrdersByOrderId(response.data.orderDetails);
                setGroupedOrders(grouped);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Calculate statistics
    const totalOrders = groupedOrders.length;
    const deliveredOrders = groupedOrders.filter(order => order.status === 'DELIVERED').length;
    const pendingOrders = groupedOrders.filter(order => order.status === 'PENDING').length;
    const totalValue = groupedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Filter orders based on search
    const filteredOrders = groupedOrders.filter(order =>
        order.productSummary.toLowerCase().includes(searchQueries.orders.toLowerCase()) ||
        getOrderNumber(order.orderId).toLowerCase().includes(searchQueries.orders.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading orders...</div>
            </div>
        );
    }
    const handleViewOrder = (order: GroupedOrder) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    const handleEditOrder = (order: GroupedOrder) => {
        setSelectedOrder(order);
        setEditFormData({
            status: order.status,
            notes: order.items[0]?.notes || '',
            requestedDeliveryDate: order.items[0]?.requestedDeliveryDate || ''
        });
        setShowEditModal(true);
    };

    const handleUpdateOrder = async () => {
        if (!selectedOrder) return;

        try {
            setIsUpdatingOrder(true);
            // Update each order item
            for (const item of selectedOrder.items) {
                await put(`/admin/orders/${item.id}`, {
                    status: editFormData.status,
                    notes: editFormData.notes,
                    requestedDeliveryDate: editFormData.requestedDeliveryDate || null
                }, {
                    withCredentials: true
                });
            }

            // Refresh orders
            await fetchOrders();
            setShowEditModal(false);
            setSelectedOrder(null);
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Failed to update order. Please try again.');
        } finally {
            setIsUpdatingOrder(false);
        }
    };

    const handleDownloadOrder = (order: GroupedOrder) => {
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(20);
        doc.setTextColor(88, 28, 135); // Purple color
        doc.text('Harmony SurgiTech', 20, 20);
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text('Order Invoice', 20, 35);
        
        // Order Info
        doc.setFontSize(12);
        doc.text(`Order ID: ${getOrderNumber(order.orderId)}`, 20, 50);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 60);
        doc.text(`Status: ${order.status}`, 20, 70);
        doc.text(`Total Amount: $${order.totalAmount.toFixed(2)}`, 20, 80);
        
        // Distributor Information
        doc.setFontSize(14);
        doc.setTextColor(88, 28, 135);
        doc.text('Distributor Information', 20, 100);
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`Company: ${order.distributor.companyName}`, 20, 115);
        doc.text(`Owner: ${order.distributor.ownerName}`, 20, 125);
        doc.text(`Email: ${order.distributor.email}`, 20, 135);
        doc.text(`Phone: ${order.distributor.phone}`, 20, 145);
        doc.text(`Address: ${order.distributor.address}`, 20, 155);
        
        // Table data
        const tableData = order.items.map(item => [
            item.productSku,
            item.productName,
            item.quantity.toString(),
            `$${parseFloat(item.unitPrice).toFixed(2)}`,
            `$${parseFloat(item.lineTotal).toFixed(2)}`
        ]);
        
        // Add table
        autoTable(doc, {
            head: [['SKU', 'Product Name', 'Quantity', 'Unit Price', 'Total']],
            body: tableData,
            startY: 170,
            theme: 'striped',
            headStyles: { fillColor: [88, 28, 135] },
            styles: { fontSize: 10 }
        });
        
        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text('Thank you for your business!', 20, pageHeight - 20);
        doc.text('Harmony SurgiTech - Medical Equipment Solutions', 20, pageHeight - 10);
        
        // Open in new window
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    };

    const closeModal = () => {
        setShowViewModal(false);
        setShowEditModal(false);
        setSelectedOrder(null);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
                        <p className="text-gray-600 mt-1">Track and manage all distributor orders</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md">
                        <Plus className="h-4 w-4" />
                        <span>New Order</span>
                    </button>
                </div>
                {/* Order Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Orders</p>
                                <p className="text-3xl font-bold">{totalOrders}</p>
                                <div className="flex items-center mt-2">
                                    <ArrowUpRight className="h-4 w-4 text-blue-200" />
                                    <span className="text-blue-200 text-sm ml-1">+12.5%</span>
                                </div>
                            </div>
                            <ShoppingCart className="h-12 w-12 text-blue-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Completed</p>
                                <p className="text-3xl font-bold">{deliveredOrders}</p>
                                <div className="flex items-center mt-2">
                                    <ArrowUpRight className="h-4 w-4 text-green-200" />
                                    <span className="text-green-200 text-sm ml-1">+8.3%</span>
                                </div>
                            </div>
                            <Check className="h-12 w-12 text-green-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-yellow-100 text-sm font-medium">Pending</p>
                                <p className="text-3xl font-bold">{pendingOrders}</p>
                                <div className="flex items-center mt-2">
                                    <Clock className="h-4 w-4 text-yellow-200" />
                                    <span className="text-yellow-200 text-sm ml-1">-2.1%</span>
                                </div>
                            </div>
                            <Clock className="h-12 w-12 text-yellow-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Total Value</p>
                                <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
                                <div className="flex items-center mt-2">
                                    <ArrowUpRight className="h-4 w-4 text-purple-200" />
                                    <span className="text-purple-200 text-sm ml-1">+15.2%</span>
                                </div>
                            </div>
                            <DollarSign className="h-12 w-12 text-purple-200" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQueries.orders}
                            onChange={(e) => handleSearchChange('orders', e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>
                    <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                        <option>All Distributors</option>
                        <option>MedSupply Co.</option>
                        <option>Healthcare Plus</option>
                        <option>SurgiTech Ltd.</option>
                    </select>
                    <button className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center space-x-2 hover:bg-gray-100">
                        <Filter className="h-4 w-4" />
                        <span>More Filters</span>
                    </button>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Distributor</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Products</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-blue-600">{getOrderNumber(order.orderId)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">Unknown Distributor</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{order.productSummary}</div>
                                        <div className="text-xs text-gray-500">{order.itemCount} items</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                            order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'SHIPPED' ? 'bg-indigo-100 text-indigo-800' :
                                                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status === 'DELIVERED' ? 'Delivered' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <ViewButton onClick={() => handleViewOrder(order)}/>
                                        <EditButton onClick={() => handleEditOrder(order)}/>
                                        <DownloadButton onClick={() => handleDownloadOrder(order)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                        Showing 1 to {filteredOrders.length} of {totalOrders} orders
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                            Previous
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
                            1
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                            2
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                            3
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* View Order Modal */}
            {showViewModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl mx-4 pointer-events-auto">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 rounded-t-2xl flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                    <Eye className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Order Details</h3>
                                    <p className="text-purple-100 text-sm">{getOrderNumber(selectedOrder.orderId)}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 bg-gray-50 max-h-96 overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Order Information */}
                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-blue-500 p-2 rounded-lg">
                                            <Package className="h-5 w-5 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-blue-900">Order Information</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-blue-600 text-sm font-medium">Order ID</p>
                                            <p className="text-blue-900 font-semibold">{getOrderNumber(selectedOrder.orderId)}</p>
                                        </div>
                                        <div>
                                            <p className="text-blue-600 text-sm font-medium">Status</p>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                selectedOrder.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {selectedOrder.status}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-blue-600 text-sm font-medium">Total Items</p>
                                            <p className="text-blue-900 font-semibold">{selectedOrder.itemCount}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Financial Information */}
                                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-green-500 p-2 rounded-lg">
                                            <DollarSign className="h-5 w-5 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-green-900">Financial Details</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-green-600 text-sm font-medium">Total Amount</p>
                                            <p className="text-green-900 font-bold text-lg">${selectedOrder.totalAmount.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-green-600 text-sm font-medium">Payment Status</p>
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Paid
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Distributor Information */}
                                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-orange-500 p-2 rounded-lg">
                                            <User className="h-5 w-5 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-orange-900">Distributor Details</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-orange-600 text-sm font-medium">Company</p>
                                            <p className="text-orange-900 font-semibold">{selectedOrder.distributor.companyName}</p>
                                        </div>
                                        <div>
                                            <p className="text-orange-600 text-sm font-medium">Owner</p>
                                            <p className="text-orange-900 font-semibold">{selectedOrder.distributor.ownerName}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Mail className="h-4 w-4 text-orange-600" />
                                            <p className="text-orange-900 text-sm">{selectedOrder.distributor.email}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Phone className="h-4 w-4 text-orange-600" />
                                            <p className="text-orange-900 text-sm">{selectedOrder.distributor.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Date Information */}
                                <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-purple-500 p-2 rounded-lg">
                                            <Calendar className="h-5 w-5 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-purple-900">Date Information</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-purple-600 text-sm font-medium">Order Date</p>
                                            <p className="text-purple-900 font-semibold">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-purple-600 text-sm font-medium">Delivery Date</p>
                                            <p className="text-purple-900 font-semibold">
                                                {selectedOrder.items[0]?.requestedDeliveryDate 
                                                    ? new Date(selectedOrder.items[0].requestedDeliveryDate).toLocaleDateString()
                                                    : 'Not specified'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Distributor Address - Full Width */}
                            <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-4">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="bg-slate-500 p-2 rounded-lg">
                                        <MapPin className="h-5 w-5 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-slate-900">Shipping Address</h4>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-slate-200">
                                    <p className="text-slate-700 leading-relaxed">{selectedOrder.distributor.address}</p>
                                </div>
                            </div>

                            {/* Products Table */}
                            <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h4 className="font-semibold text-gray-900">Order Items</h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {selectedOrder.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{item.productName}</p>
                                                            <p className="text-sm text-gray-500">{item.productBrand}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{item.productSku}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">${parseFloat(item.unitPrice).toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">${parseFloat(item.lineTotal).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Order Modal */}
            {showEditModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl mx-4 pointer-events-auto">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 rounded-t-2xl flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                    <Edit className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Edit Order</h3>
                                    <p className="text-purple-100 text-sm">{getOrderNumber(selectedOrder.orderId)}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                                    <select
                                        value={editFormData.status}
                                        onChange={(e) => setEditFormData(prev => ({ ...prev, status: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="SHIPPED">Shipped</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
                                    <input
                                        type="date"
                                        value={editFormData.requestedDeliveryDate}
                                        onChange={(e) => setEditFormData(prev => ({ ...prev, requestedDeliveryDate: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes</label>
                                <textarea
                                    value={editFormData.notes}
                                    onChange={(e) => setEditFormData(prev => ({ ...prev, notes: e.target.value }))}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="Add any notes or comments about this order..."
                                />
                            </div>

                            {/* Distributor Information */}
                            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                <h4 className="font-medium text-orange-900 mb-3 flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    Distributor Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-orange-600 font-medium">Company:</span>
                                        <p className="text-orange-900">{selectedOrder.distributor.companyName}</p>
                                    </div>
                                    <div>
                                        <span className="text-orange-600 font-medium">Owner:</span>
                                        <p className="text-orange-900">{selectedOrder.distributor.ownerName}</p>
                                    </div>
                                    <div>
                                        <span className="text-orange-600 font-medium">Email:</span>
                                        <p className="text-orange-900">{selectedOrder.distributor.email}</p>
                                    </div>
                                    <div>
                                        <span className="text-orange-600 font-medium">Phone:</span>
                                        <p className="text-orange-900">{selectedOrder.distributor.phone}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="text-orange-600 font-medium">Address:</span>
                                        <p className="text-orange-900 mt-1">{selectedOrder.distributor.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Items:</span>
                                        <span className="font-medium">{selectedOrder.itemCount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Amount:</span>
                                        <span className="font-semibold text-lg">${selectedOrder.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                disabled={isUpdatingOrder}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateOrder}
                                disabled={isUpdatingOrder}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                            >
                                {isUpdatingOrder ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <span>Update Order</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
