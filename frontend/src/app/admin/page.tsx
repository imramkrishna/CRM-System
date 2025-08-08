'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/slices/authSlice';
// Theme imports removed
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
    ArrowDownRight
} from 'lucide-react';

const AdminDashboard = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    // Theme-related code removed
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            router.push('/auth/admin-login');
        }
    }, [isAuthenticated, user, router]);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    // Loading state 
    // Theme mounting check removed

    if (!isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'sell-details', label: 'Sell Details', icon: TrendingUp },
        { id: 'customers', label: 'Customer List (Distributors)', icon: Users },
        { id: 'manual-request', label: 'Manual Request', icon: FileText },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'purchases', label: 'Purchases', icon: ShoppingCart },
        { id: 'quotation', label: 'Quotation', icon: Receipt },
        {
            id: 'returns',
            label: 'Returns',
            icon: RotateCcw,
            submenu: [
                { id: 'stock-return', label: 'Stock Return' },
                { id: 'supplier-return', label: 'Supplier Return' },
                { id: 'wastage-return', label: 'Wastage Return' }
            ]
        },
        { id: 'transaction-history', label: 'Transaction History', icon: History },
        { id: 'pending-payments', label: 'Pending Payments', icon: CreditCard }
    ];

    const stats = [
        {
            title: 'Total Products',
            value: '4,892',
            change: '+12%',
            trend: 'up',
            icon: Package,
            color: 'blue',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Available Stock',
            value: '2,137',
            change: '+8%',
            trend: 'up',
            icon: BarChart3,
            color: 'green',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: 'Low Stock',
            value: '1,952',
            change: '-15%',
            trend: 'down',
            icon: AlertTriangle,
            color: 'yellow',
            bgColor: 'bg-yellow-50',
            iconColor: 'text-yellow-600'
        },
        {
            title: 'Out of Stock',
            value: '803',
            change: '-5%',
            trend: 'down',
            icon: Package,
            color: 'red',
            bgColor: 'bg-red-50',
            iconColor: 'text-red-600'
        }
    ];

    const recentActivity = [
        {
            user: 'Abram Workman',
            action: 'completed admin task 1 of 5',
            time: '2h ago',
            avatar: 'AW'
        },
        {
            user: 'David Alan Martin',
            action: 'updated Low Stock item',
            time: '4h ago',
            avatar: 'DM'
        },
        {
            user: 'Ann Grubner',
            action: 'added New Product Business',
            time: '6h ago',
            avatar: 'AG'
        }
    ];

    const upcomingRestock = [
        { product: 'Waterproof Arctic Boots', days: '30 days', status: 'pending' },
        { product: 'Digital Learning Torch Ring', days: '40 days', status: 'pending' },
        { product: 'Nordic Running Sneakers', days: '60 days', status: 'pending' },
        { product: 'Luxury Watch Collection', days: '20 days', status: 'urgent' },
        { product: 'Nordic Leather Wallet', days: '60 days', status: 'pending' }
    ];

    const renderDashboard = () => (
        <div className="space-y-5">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                                </div>
                                <div className={`flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    <TrendIcon className="h-3.5 w-3.5" />
                                    <span>{stat.change}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Profit by Category Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <BarChart3 className="h-5 w-5 text-green-600" />
                                <h3 className="text-base font-semibold text-gray-900">Profit by Category</h3>
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                                <span>This Month</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-center h-64 rounded-lg">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 via-orange-400 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                                    <span className="text-2xl font-bold text-white">$1M</span>
                                </div>
                                <p className="text-gray-600 font-medium">Total Revenue</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-3">
                            {[
                                { category: "Surgical Instruments", amount: '$510,000', color: 'bg-green-500', icon: 'bg-green-100 text-green-600' },
                                { category: "Monitoring Equipment", amount: '$295,000', color: 'bg-blue-500', icon: 'bg-blue-100 text-blue-600' },
                                { category: "Diagnostic Equipment", amount: '$165,000', color: 'bg-yellow-500', icon: 'bg-yellow-100 text-yellow-600' },
                                { category: "Consumables", amount: '$30,000', color: 'bg-red-500', icon: 'bg-red-100 text-red-600' }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                        <span className="text-sm text-gray-700 font-medium">{item.category}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{item.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                            <ShoppingCart className="h-5 w-5 text-blue-600" />
                            <h3 className="text-base font-semibold text-gray-900">Order Summary</h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-gray-900">$8,870</div>
                            <div className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full mt-2 inline-flex items-center font-medium">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                $2.6k vs last month
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Direct Sales', value: '27%', color: 'bg-blue-500' },
                                { label: 'Distributors', value: '53%', color: 'bg-green-500' },
                                { label: 'Online Orders', value: '18%', color: 'bg-yellow-500' },
                                { label: 'International', value: '10%', color: 'bg-purple-500' }
                            ].map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                        <span className="text-sm text-gray-600">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stock Level and Upcoming Restock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Stock Level */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            <h3 className="text-base font-semibold text-gray-900">Stock Level</h3>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-gray-900">225</div>
                            <div className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full mt-2 inline-block font-medium">
                                In Stock
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { item: 'Surgical Scalpel Set', percent: '52 of 100 remaining', value: 52 },
                                { item: 'Digital Blood Pressure Monitor', percent: '42 of 100 remaining', value: 42 },
                                { item: 'Disposable Syringes', percent: '65 of 100 remaining', value: 65 }
                            ].map((item, index) => (
                                <div key={index} className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-700 font-medium">{item.item}</span>
                                        <span className="text-gray-900 font-medium">{item.percent}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full ${item.value >= 60 ? 'bg-green-500' : item.value >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                            style={{ width: `${item.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upcoming Restock */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-orange-600" />
                            <h3 className="text-base font-semibold text-gray-900">Upcoming Restock</h3>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="space-y-3">
                            {upcomingRestock.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-1.5 h-10 ${item.status === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'} rounded-full`}></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{item.product}</p>
                                            <p className="text-xs text-gray-500 flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                Arriving in {item.days}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${item.status === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                            {item.status === 'urgent' ? (
                                                <>
                                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                                    Urgent
                                                </>
                                            ) : (
                                                <>
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    Pending
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-5 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <History className="h-5 w-5 text-purple-600" />
                            <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View All
                        </button>
                    </div>
                </div>
                <div className="p-5">
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-sm">
                                    {activity.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        <span className="font-semibold text-gray-900">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5 flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {activity.time}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return renderDashboard();
            case 'sell-details':
                return (
                    <div className="space-y-5">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                            <h2 className="text-xl font-bold text-gray-900 mb-5">Sell Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-5 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-blue-100 text-sm">Total Sales</p>
                                            <p className="text-2xl font-bold">$2.4M</p>
                                        </div>
                                        <DollarSign className="h-8 w-8 text-blue-200" />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-5 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-100 text-sm">Orders</p>
                                            <p className="text-2xl font-bold">1,258</p>
                                        </div>
                                        <ShoppingBag className="h-8 w-8 text-green-200" />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-5 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-purple-100 text-sm">Avg. Order</p>
                                            <p className="text-2xl font-bold">$1,907</p>
                                        </div>
                                        <TrendingUp className="h-8 w-8 text-purple-200" />
                                    </div>
                                </div>
                            </div>

                            {/* Sell Details Table Header */}
                            <div className="mb-5 flex justify-between items-center">
                                <h3 className="text-base font-semibold text-gray-900">Recent Sales</h3>
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                                        <Filter className="h-4 w-4" />
                                        <span>Filter</span>
                                    </button>
                                    <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                                        <Download className="h-4 w-4" />
                                        <span>Export</span>
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Invoice
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[
                                            { invoice: 'INV-38943', customer: 'Mayo Clinic', date: 'Aug 05, 2025', amount: '$4,320.00', status: 'Paid' },
                                            { invoice: 'INV-38942', customer: 'Cleveland Hospital', date: 'Aug 04, 2025', amount: '$2,180.00', status: 'Pending' },
                                            { invoice: 'INV-38941', customer: 'Johns Hopkins', date: 'Aug 03, 2025', amount: '$7,560.00', status: 'Paid' },
                                            { invoice: 'INV-38940', customer: 'Mass General', date: 'Aug 02, 2025', amount: '$1,240.00', status: 'Cancelled' },
                                            { invoice: 'INV-38939', customer: 'UCLA Medical', date: 'Aug 01, 2025', amount: '$5,720.00', status: 'Paid' }
                                        ].map((sale, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                                    {sale.invoice}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {sale.customer}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {sale.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {sale.amount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${sale.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                        sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        {sale.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Showing 5 of 124 sales
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
            case 'customers':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">Customer List (Distributors)</h2>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search distributors..."
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-full text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Add Distributor</span>
                                </button>
                            </div>
                        </div>

                        {/* Customer/Distributor Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-600">Total Distributors</p>
                                <p className="text-2xl font-bold text-gray-900">254</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-600">Active</p>
                                <p className="text-2xl font-bold text-gray-900">186</p>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-600">New This Month</p>
                                <p className="text-2xl font-bold text-gray-900">15</p>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg">
                                <p className="text-sm text-red-600">Pending Approval</p>
                                <p className="text-2xl font-bold text-gray-900">8</p>
                            </div>
                        </div>

                        {/* Customer/Distributor List */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Distributor
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Region
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Orders
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Revenue
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        {
                                            name: 'MedTech Supplies',
                                            contact: 'John Smith',
                                            email: 'john@medtech.com',
                                            region: 'Northeast',
                                            orders: 254,
                                            revenue: '$1.2M',
                                            status: 'Active'
                                        },
                                        {
                                            name: 'Surgical Distributors Inc',
                                            contact: 'Sarah Johnson',
                                            email: 'sarah@surgi-dist.com',
                                            region: 'Midwest',
                                            orders: 187,
                                            revenue: '$876K',
                                            status: 'Active'
                                        },
                                        {
                                            name: 'HealthCare Instruments',
                                            contact: 'Mike Thompson',
                                            email: 'mike@hcinstruments.com',
                                            region: 'West Coast',
                                            orders: 96,
                                            revenue: '$452K',
                                            status: 'Active'
                                        },
                                        {
                                            name: 'Medical Solutions Ltd',
                                            contact: 'Rachel Adams',
                                            email: 'rachel@medsol.com',
                                            region: 'Southwest',
                                            orders: 32,
                                            revenue: '$128K',
                                            status: 'Inactive'
                                        },
                                        {
                                            name: 'ProMed Equipment',
                                            contact: 'David Wilson',
                                            email: 'david@promedequip.com',
                                            region: 'Southeast',
                                            orders: 0,
                                            revenue: '$0',
                                            status: 'Pending'
                                        }
                                    ].map((distributor, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{distributor.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{distributor.contact}</div>
                                                <div className="text-sm text-gray-500">{distributor.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {distributor.region}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {distributor.orders}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {distributor.revenue}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${distributor.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                    distributor.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {distributor.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing 5 of 254 distributors
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
                );
            case 'inventory':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-64 text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Add Product</span>
                                </button>
                            </div>
                        </div>

                        {/* Inventory Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-600">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900">4,892</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-600">In Stock</p>
                                <p className="text-2xl font-bold text-gray-900">3,241</p>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-600">Low Stock</p>
                                <p className="text-2xl font-bold text-gray-900">126</p>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg">
                                <p className="text-sm text-red-600">Out of Stock</p>
                                <p className="text-2xl font-bold text-gray-900">38</p>
                            </div>
                        </div>

                        {/* Inventory Categories */}
                        <div className="mb-6">
                            <div className="flex overflow-x-auto pb-2 space-x-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg whitespace-nowrap">
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

                        {/* Inventory Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            SKU
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            In Stock
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        {
                                            name: 'Premium Surgical Scissors',
                                            sku: 'SS-2024-001',
                                            category: 'Surgical Instruments',
                                            stock: 245,
                                            price: '$129.99',
                                            status: 'In Stock'
                                        },
                                        {
                                            name: 'Digital Blood Pressure Monitor',
                                            sku: 'BP-2023-053',
                                            category: 'Monitoring Equipment',
                                            stock: 128,
                                            price: '$349.99',
                                            status: 'In Stock'
                                        },
                                        {
                                            name: 'Surgical Gloves (Box of 100)',
                                            sku: 'SG-2024-422',
                                            category: 'Consumables',
                                            stock: 15,
                                            price: '$24.99',
                                            status: 'Low Stock'
                                        },
                                        {
                                            name: 'Advanced Stethoscope',
                                            sku: 'ST-2023-210',
                                            category: 'Diagnostic Tools',
                                            stock: 53,
                                            price: '$189.99',
                                            status: 'In Stock'
                                        },
                                        {
                                            name: 'Portable ECG Machine',
                                            sku: 'ECG-2024-005',
                                            category: 'Monitoring Equipment',
                                            stock: 0,
                                            price: '$1,299.99',
                                            status: 'Out of Stock'
                                        }
                                    ].map((product, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.sku}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                {product.stock}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {product.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                                    product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing 5 of 4,892 products
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
                );
            case 'pending-payments':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Payments</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { customer: 'MedSupply Corp', amount: '$15,240', days: '5 days overdue', status: 'overdue' },
                                { customer: 'HealthTech Solutions', amount: '$8,950', days: 'Due today', status: 'due' },
                                { customer: 'Medical Innovations', amount: '$22,100', days: 'Due in 3 days', status: 'upcoming' }
                            ].map((payment, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-semibold text-gray-900">{payment.customer}</h3>
                                        <span className={`px-2 py-1 text-xs rounded-full ${payment.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                            payment.status === 'due' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                            {payment.status}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 mb-2">{payment.amount}</p>
                                    <p className="text-sm text-gray-600 mb-4">{payment.days}</p>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                                        Send Reminder
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'manual-request':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manual Request</h2>

                        {/* Form Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Form */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-gray-50/50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Information</h3>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Request Type
                                                </label>
                                                <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option>Product Order</option>
                                                    <option>Special Request</option>
                                                    <option>Replacement</option>
                                                    <option>Sample Request</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Priority
                                                </label>
                                                <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option>Standard</option>
                                                    <option>Urgent</option>
                                                    <option>Emergency</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Distributor
                                            </label>
                                            <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option>Select a distributor</option>
                                                <option>MedTech Supplies</option>
                                                <option>Surgical Distributors Inc</option>
                                                <option>HealthCare Instruments</option>
                                                <option>Medical Solutions Ltd</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Request Description
                                            </label>
                                            <textarea
                                                rows={4}
                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Provide details about the request..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50/50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Selection</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-gray-900">Selected Products</h4>
                                            <button className="text-sm text-blue-600 hover:text-blue-800">
                                                + Add Another Product
                                            </button>
                                        </div>

                                        {/* Product Item */}
                                        {[1, 2].map((item) => (
                                            <div key={item} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                                <div className="flex-1">
                                                    <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2">
                                                        <option>Select product</option>
                                                        <option>Premium Surgical Scissors</option>
                                                        <option>Digital Blood Pressure Monitor</option>
                                                        <option>Surgical Gloves (Box of 100)</option>
                                                        <option>Advanced Stethoscope</option>
                                                    </select>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <input
                                                                type="number"
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                placeholder="Quantity"
                                                                min="1"
                                                            />
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-500">Unit Price: $129.99</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="text-red-500 hover:text-red-700">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}

                                        <div className="flex justify-end">
                                            <p className="text-lg font-semibold text-gray-900">
                                                Total: $389.97
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg">
                                        Cancel
                                    </button>
                                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                        Submit Request
                                    </button>
                                </div>
                            </div>

                            {/* Recent Requests */}
                            <div>
                                <div className="bg-gray-50/50 rounded-lg p-6 h-full">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>

                                    <div className="space-y-3">
                                        {[
                                            { id: 'REQ-8944', date: 'Aug 7, 2025', status: 'Pending', priority: 'Urgent' },
                                            { id: 'REQ-8943', date: 'Aug 6, 2025', status: 'Processing', priority: 'Standard' },
                                            { id: 'REQ-8942', date: 'Aug 5, 2025', status: 'Completed', priority: 'Standard' },
                                            { id: 'REQ-8941', date: 'Aug 4, 2025', status: 'Cancelled', priority: 'Emergency' },
                                            { id: 'REQ-8940', date: 'Aug 3, 2025', status: 'Completed', priority: 'Standard' }
                                        ].map((req, i) => (
                                            <div key={i} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-blue-600">{req.id}</p>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${req.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        req.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                            req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                        }`}>
                                                        {req.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <p className="text-xs text-gray-500">{req.date}</p>
                                                    <span className={`text-xs ${req.priority === 'Emergency' ? 'text-red-600' :
                                                        req.priority === 'Urgent' ? 'text-yellow-600' :
                                                            'text-gray-600'
                                                        }`}>
                                                        {req.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-800">
                                        View All Requests
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="space-y-5">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Package className="h-8 w-8 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {menuItems.find(item => item.id === activeSection)?.label || 'Section'}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    This section is under development. Professional UI components will be implemented here.
                                </p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                                    Coming Soon
                                </button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header - Logo */}
                    <div className="flex items-center h-16 px-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
                                <Package className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="font-bold text-base text-gray-900">Harmony Surgitech</h1>
                                <p className="text-xs text-gray-500">Admin Dashboard</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden p-2 ml-auto rounded-md text-gray-500 hover:bg-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Nav Menu */}
                    <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.id}>
                                    <button
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-md transition-colors ${activeSection === item.id
                                            ? 'bg-blue-50 text-blue-600 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="text-sm">{item.label}</span>
                                        {item.submenu && <ChevronDown className="h-4 w-4 ml-auto" />}
                                    </button>
                                    {item.submenu && activeSection === item.id && (
                                        <div className="ml-7 mt-1 space-y-1 py-1">
                                            {item.submenu.map((subItem) => (
                                                <button
                                                    key={subItem.id}
                                                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                                >
                                                    {subItem.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="px-3 py-3 border-t border-gray-100 mt-auto">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-gray-200"
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
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                                    {user?.name?.split(' ')[0] || 'Admin'}
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

export default AdminDashboard;
