import {
    ShoppingCart,
    Search,
    DollarSign,
    Plus,
    Filter,
    Download,
    Eye,
    Edit,
    Trash2,
    Check,
    Clock,
    ArrowUpRight
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { get } from '@/lib/api';

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

interface GroupedOrder {
    orderId: string;
    items: OrderItem[];
    totalAmount: number;
    itemCount: number;
    productSummary: string;
    status: string;
    createdAt: string;
    isFulfilled: boolean;
}

const Orders = () => {
    const [searchQueries, setSearchQueries] = useState({
        orders: ''
    });
    const [orderDetails, setOrderDetails] = useState<OrderItem[]>([]);
    const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>([]);
    const [loading, setLoading] = useState(true);

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

            return {
                orderId,
                items,
                totalAmount,
                itemCount: items.length,
                productSummary,
                status,
                createdAt: items[0].createdAt,
                isFulfilled
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
                                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-50">
                                            <Download className="h-4 w-4" />
                                        </button>
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
        </div>
    );

};

export default Orders
