import {
    LayoutDashboard,
    TrendingUp,
    Users,
    FileText,
    Package,
    ShoppingCart,
    Receipt,
    RotateCcw,
    History,
    CreditCard,
    Search,
    Bell,
    Settings,
    Moon,
    Sun,
    LogOut,
    Menu,
    X,
    ChevronDown,
    BarChart3,
    DollarSign,
    ShoppingBag,
    AlertTriangle,
    Plus,
    Filter,
    Download,
    Eye,
    Edit,
    Trash2,
    Check,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    UserPlus,
    UserCheck,
    UserX,
    Calendar,
    Star,
    Building,
    Phone,
    Mail,
    MapPin,
    Truck,
    RefreshCw,
    XCircle,
    Printer,
    CheckCircle,
    FileBarChart
} from 'lucide-react';
import { useState } from 'react';

const Orders = () => {
    const [searchQueries, setSearchQueries] = useState({
        orders: ''
    });

    const handleSearchChange = (section: string, value: string) => {
        setSearchQueries(prev => ({
            ...prev,
            [section]: value
        }));
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
                                <p className="text-3xl font-bold">1,247</p>
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
                                <p className="text-3xl font-bold">896</p>
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
                                <p className="text-3xl font-bold">351</p>
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
                                <p className="text-3xl font-bold">$2.8M</p>
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
                            {[
                                { id: 'ORD-001', distributor: 'MedSupply Co.', products: 'Surgical Masks, Gloves', amount: '$2,450', status: 'Delivered', date: '2024-01-15', items: 15 },
                                { id: 'ORD-002', distributor: 'Healthcare Plus', products: 'Syringes, Bandages', amount: '$1,890', status: 'Processing', date: '2024-01-14', items: 8 },
                                { id: 'ORD-003', distributor: 'SurgiTech Ltd.', products: 'Stethoscopes, Thermometers', amount: '$3,200', status: 'Shipped', date: '2024-01-13', items: 12 },
                                { id: 'ORD-004', distributor: 'MediCore Inc.', products: 'IV Sets, Catheters', amount: '$1,650', status: 'Pending', date: '2024-01-12', items: 6 },
                                { id: 'ORD-005', distributor: 'HealthFirst', products: 'Surgical Instruments', amount: '$4,800', status: 'Delivered', date: '2024-01-11', items: 20 }
                            ].map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-blue-600">{order.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{order.distributor}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{order.products}</div>
                                        <div className="text-xs text-gray-500">{order.items} items</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">{order.amount}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Shipped' ? 'bg-indigo-100 text-indigo-800' :
                                                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.date}
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
                        Showing 1 to 5 of 1,247 orders
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
