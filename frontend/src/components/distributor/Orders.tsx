
import {
    Package,
    ShoppingCart,
    TrendingUp,
    DollarSign,
    LogOut,
    Search,
    LayoutDashboard,
    History,
    Menu,
    X,
    ChevronDown,
    Bell,
    BarChart3,
    AlertTriangle,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    Users,
    Star,
    Building,
    Phone,
    Mail,
    MapPin,
    Plus,
    Filter,
    Download,
    Eye,
    Edit,
    Trash2,
    Check,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { useState } from 'react';
const Orders = () => {
    const [searchQueries, setSearchQueries] = useState({
        orders: '',
    });

    const handleSearchChange = (field: string, value: string) => {
        setSearchQueries((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="space-y-6 bg-gray-50/50 p-5 rounded-2xl">
            {/* Order Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-5 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium mb-1">Total Orders</p>
                            <p className="text-2xl font-bold">127</p>
                            <div className="flex items-center mt-2">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium text-blue-100">+15% this month</span>
                            </div>
                        </div>
                        <div className="bg-blue-400 bg-opacity-30 p-3 rounded-lg">
                            <ShoppingCart className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-5 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm font-medium mb-1">Completed</p>
                            <p className="text-2xl font-bold">98</p>
                            <div className="flex items-center mt-2">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium text-green-100">77% completion</span>
                            </div>
                        </div>
                        <div className="bg-green-400 bg-opacity-30 p-3 rounded-lg">
                            <CheckCircle className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-5 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-yellow-100 text-sm font-medium mb-1">Pending</p>
                            <p className="text-2xl font-bold">23</p>
                            <div className="flex items-center mt-2">
                                <Clock className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium text-yellow-100">18% pending</span>
                            </div>
                        </div>
                        <div className="bg-yellow-400 bg-opacity-30 p-3 rounded-lg">
                            <Clock className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-5 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium mb-1">Total Value</p>
                            <p className="text-2xl font-bold">$89.2K</p>
                            <div className="flex items-center mt-2">
                                <DollarSign className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium text-purple-100">+28% growth</span>
                            </div>
                        </div>
                        <div className="bg-purple-400 bg-opacity-30 p-3 rounded-lg">
                            <DollarSign className="h-6 w-6" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <ShoppingCart className="h-6 w-6 text-blue-600 mr-3" />
                        Order Management
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchQueries.orders}
                                onChange={(e) => handleSearchChange('orders', e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64"
                            />
                        </div>
                        <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                            <option>All Orders</option>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                        </select>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                            <Package className="h-4 w-4" />
                            <span>New Order</span>
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Products
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[
                                {
                                    id: 'ORD-2024-001',
                                    date: 'Aug 8, 2025',
                                    products: 'Surgical Scalpel Set',
                                    quantity: '3 units',
                                    amount: '$850.00',
                                    status: 'delivered'
                                },
                                {
                                    id: 'ORD-2024-002',
                                    date: 'Aug 7, 2025',
                                    products: 'Digital BP Monitor + 1 more',
                                    quantity: '2 units',
                                    amount: '$1,700.00',
                                    status: 'shipped'
                                },
                                {
                                    id: 'ORD-2024-003',
                                    date: 'Aug 6, 2025',
                                    products: 'Disposable Syringes Box',
                                    quantity: '5 units',
                                    amount: '$2,550.00',
                                    status: 'processing'
                                },
                                {
                                    id: 'ORD-2024-004',
                                    date: 'Aug 5, 2025',
                                    products: 'Advanced Stethoscope',
                                    quantity: '1 unit',
                                    amount: '$3,400.00',
                                    status: 'pending'
                                },
                                {
                                    id: 'ORD-2024-005',
                                    date: 'Aug 4, 2025',
                                    products: 'ECG Machine + accessories',
                                    quantity: '1 unit',
                                    amount: '$5,200.00',
                                    status: 'cancelled'
                                }
                            ].map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {order.products}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {order.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                        {order.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status === 'delivered' && <CheckCircle className="h-3 w-3 mr-1" />}
                                            {order.status === 'shipped' && <Package className="h-3 w-3 mr-1" />}
                                            {order.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                                            {order.status === 'pending' && <AlertTriangle className="h-3 w-3 mr-1" />}
                                            {order.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                View
                                            </button>
                                            <button className="text-green-600 hover:text-green-800 font-medium">
                                                Track
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing 5 of 127 orders
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
    )
}

export default Orders
