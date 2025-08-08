'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/slices/authSlice';
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
    XCircle
} from 'lucide-react';

const DistributorDashboard = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'distributor') {
            router.push('/auth/distributor-login');
        }
    }, [isAuthenticated, user, router]);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    if (!isAuthenticated || user?.role !== 'distributor') {
        return null;
    }

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'transaction-history', label: 'Transaction History', icon: History }
    ];

    const stats = [
        {
            title: 'Total Orders',
            value: '24',
            change: '+12%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'blue',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Available Products',
            value: '156',
            change: '+8%',
            trend: 'up',
            icon: Package,
            color: 'green',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: 'Monthly Sales',
            value: '$18,500',
            change: '+22%',
            trend: 'up',
            icon: DollarSign,
            color: 'purple',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            title: 'Performance',
            value: '94%',
            change: '+5%',
            trend: 'up',
            icon: TrendingUp,
            color: 'orange',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        }
    ];

    const recentOrders = [
        {
            id: 'D1001',
            product: 'Surgical Scalpel Set',
            items: '3 items',
            amount: '$850',
            status: 'delivered',
            date: '1 day ago'
        },
        {
            id: 'D1002',
            product: 'Digital Blood Pressure Monitor',
            items: '2 items',
            amount: '$1,700',
            status: 'delivered',
            date: '2 days ago'
        },
        {
            id: 'D1003',
            product: 'Disposable Syringes',
            items: '5 items',
            amount: '$2,550',
            status: 'in-transit',
            date: '3 days ago'
        },
        {
            id: 'D1004',
            product: 'Advanced Stethoscope',
            items: '1 item',
            amount: '$3,400',
            status: 'processing',
            date: '4 days ago'
        }
    ];

    const productCategories = [
        { name: 'Surgical Instruments', count: 45, icon: '🔪', available: 42 },
        { name: 'Monitoring Equipment', count: 28, icon: '📊', available: 25 },
        { name: 'Diagnostic Tools', count: 33, icon: '🔍', available: 31 },
        { name: 'Consumables', count: 42, icon: '💉', available: 38 },
        { name: 'Protective Equipment', count: 18, icon: '🧤', available: 16 },
        { name: 'Sterilization', count: 15, icon: '🧽', available: 14 }
    ];

    const renderDashboard = () => (
        <div className="space-y-5">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <div className="flex items-center mt-2">
                                        <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                </div>
                                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <ShoppingCart className="h-5 w-5 text-blue-600 mr-2" />
                                Recent Orders
                            </h3>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View All
                            </button>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="space-y-4">
                            {recentOrders.map((order, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Package className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Order #{order.id}</p>
                                            <p className="text-sm text-gray-600">{order.product} + {order.items}</p>
                                            <p className="text-xs text-gray-500">{order.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">{order.amount}</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'in-transit' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                            {order.status === 'delivered' && <CheckCircle className="h-3 w-3 mr-1" />}
                                            {order.status === 'in-transit' && <Clock className="h-3 w-3 mr-1" />}
                                            {order.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                            Quick Actions
                        </h3>
                    </div>
                    <div className="p-5 space-y-3">
                        <button
                            onClick={() => setActiveSection('products')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                            <Package className="h-4 w-4" />
                            <span>Browse Products</span>
                        </button>
                        <button
                            onClick={() => setActiveSection('orders')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Place New Order</span>
                        </button>
                        <button
                            onClick={() => setActiveSection('transaction-history')}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                            <History className="h-4 w-4" />
                            <span>View History</span>
                        </button>
                        <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>Download Catalog</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-5 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Package className="h-5 w-5 text-blue-600 mr-2" />
                        Product Categories
                    </h3>
                </div>
                <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {productCategories.map((category, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">{category.icon}</div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{category.name}</h4>
                                            <p className="text-sm text-gray-600">{category.count} total products</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-green-600">{category.available}</p>
                                        <p className="text-xs text-gray-500">Available</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-5 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
                        Performance Metrics
                    </h3>
                </div>
                <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                            <div className="text-sm font-medium text-gray-700">Order Accuracy</div>
                            <div className="text-xs text-gray-500 mt-1">Excellent performance</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 mb-2">2.1</div>
                            <div className="text-sm font-medium text-gray-700">Avg. Delivery Days</div>
                            <div className="text-xs text-gray-500 mt-1">Faster than average</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
                            <div className="text-sm font-medium text-gray-700">Customer Rating</div>
                            <div className="text-xs text-gray-500 mt-1">Outstanding service</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOrders = () => (
        <div className="space-y-5">
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
    );

    const renderProducts = () => (
        <div className="space-y-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">Available Products</h2>
                    <div className="flex flex-wrap gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64"
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Product Categories Filter */}
                <div className="mb-6">
                    <div className="flex overflow-x-auto pb-2 space-x-2">
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg whitespace-nowrap font-medium">
                            All Products
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg whitespace-nowrap">
                            Surgical Instruments
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg whitespace-nowrap">
                            Monitoring Equipment
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg whitespace-nowrap">
                            Diagnostic Tools
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg whitespace-nowrap">
                            Consumables
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[
                        {
                            name: 'Premium Surgical Scissors',
                            category: 'Surgical Instruments',
                            price: '$129.99',
                            stock: 245,
                            image: '✂️'
                        },
                        {
                            name: 'Digital Blood Pressure Monitor',
                            category: 'Monitoring Equipment',
                            price: '$349.99',
                            stock: 128,
                            image: '🩺'
                        },
                        {
                            name: 'Disposable Syringes (Box)',
                            category: 'Consumables',
                            price: '$24.99',
                            stock: 456,
                            image: '💉'
                        },
                        {
                            name: 'Advanced Stethoscope',
                            category: 'Diagnostic Tools',
                            price: '$189.99',
                            stock: 53,
                            image: '🩺'
                        },
                        {
                            name: 'Surgical Mask (Pack of 50)',
                            category: 'Protective Equipment',
                            price: '$19.99',
                            stock: 789,
                            image: '😷'
                        },
                        {
                            name: 'ECG Machine Portable',
                            category: 'Monitoring Equipment',
                            price: '$1,299.99',
                            stock: 12,
                            image: '📈'
                        }
                    ].map((product, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="text-center mb-4">
                                <div className="text-4xl mb-2">{product.image}</div>
                                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                                <p className="text-lg font-bold text-blue-600">{product.price}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Stock:</span>
                                    <span className={`font-medium ${product.stock > 100 ? 'text-green-600' : product.stock > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {product.stock} units
                                    </span>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                                    Add to Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing 6 of 156 products
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md">
                            Previous
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
                            1
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md">
                            2
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md">
                            3
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTransactionHistory = () => (
        <div className="space-y-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
                    <div className="flex flex-wrap gap-3">
                        <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                            <option>All Transactions</option>
                            <option>Completed</option>
                            <option>Pending</option>
                            <option>Cancelled</option>
                        </select>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Export
                        </button>
                    </div>
                </div>

                {/* Transaction Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Transaction ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Products
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
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
                                    id: 'TXN-2024-001',
                                    date: 'Aug 7, 2025',
                                    products: 'Surgical Scalpel Set + 2 items',
                                    amount: '$850.00',
                                    status: 'completed'
                                },
                                {
                                    id: 'TXN-2024-002',
                                    date: 'Aug 6, 2025',
                                    products: 'Digital BP Monitor + 1 item',
                                    amount: '$1,700.00',
                                    status: 'completed'
                                },
                                {
                                    id: 'TXN-2024-003',
                                    date: 'Aug 5, 2025',
                                    products: 'Disposable Syringes + 4 items',
                                    amount: '$2,550.00',
                                    status: 'pending'
                                },
                                {
                                    id: 'TXN-2024-004',
                                    date: 'Aug 4, 2025',
                                    products: 'Advanced Stethoscope',
                                    amount: '$3,400.00',
                                    status: 'processing'
                                },
                                {
                                    id: 'TXN-2024-005',
                                    date: 'Aug 3, 2025',
                                    products: 'ECG Machine + accessories',
                                    amount: '$5,200.00',
                                    status: 'cancelled'
                                }
                            ].map((transaction, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {transaction.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {transaction.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {transaction.products}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                        {transaction.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                transaction.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {transaction.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                                            {transaction.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                            {transaction.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                                            {transaction.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing 5 of 47 transactions
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md">
                            Previous
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
                            1
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md">
                            2
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md">
                            3
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return renderDashboard();
            case 'orders':
                return renderOrders();
            case 'products':
                return renderProducts();
            case 'transaction-history':
                return renderTransactionHistory();
            default:
                return renderDashboard();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out shadow-xl`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header - Logo */}
                    <div className="flex items-center h-16 px-4 border-b border-slate-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md flex items-center justify-center text-white shadow-lg">
                                <Package className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="font-bold text-base text-white">Harmony Surgitech</h1>
                                <p className="text-xs text-slate-400">Distributor Portal</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden p-2 ml-auto rounded-md text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Nav Menu */}
                    <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-all duration-200 group ${activeSection === item.id
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                                        : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-105'
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 ${activeSection === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                                    <span className="text-sm font-medium">{item.label}</span>
                                    {activeSection === item.id && (
                                        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="px-3 py-3 border-t border-slate-700 mt-auto">
                        <div className="flex items-center space-x-3 mb-3 p-2 rounded-lg bg-slate-700">
                            <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                                {user?.name?.charAt(0) || 'D'}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">{user?.name || 'Distributor'}</p>
                                <p className="text-xs text-slate-400">Distributor</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all duration-200 border border-slate-600 hover:border-red-400"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-56 w-full min-h-screen">
                {/* Header */}
                <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between h-16 px-4">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate flex items-center">
                                <span className="w-1.5 h-5 bg-blue-600 rounded-sm mr-2 hidden sm:block"></span>
                                {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
                            </h2>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="relative hidden sm:block">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-56 text-gray-900 placeholder-gray-500"
                                />
                            </div>

                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <Search className="h-5 w-5 sm:hidden" />
                                <Bell className="h-5 w-5 hidden sm:block" />
                            </button>

                            <div className="flex items-center space-x-2 border-l pl-3 ml-1">
                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                    {user?.name?.charAt(0) || 'D'}
                                </div>
                                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                                    {user?.name?.split(' ')[0] || 'Distributor'}
                                </span>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Header Spacer - Ensures content doesn't overlap */}
                <div className="h-4"></div>

                {/* Page Content */}
                <main className="p-5 bg-gray-50 min-h-[calc(100vh-5rem)]">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        renderContent()
                    )}
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 md:hidden bg-gray-600 bg-opacity-75"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DistributorDashboard;
