'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/slices/authSlice';
import { Package, ShoppingCart, TrendingUp, DollarSign, LogOut, Bell, Search } from 'lucide-react';

const DistributorDashboard = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

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

    const stats = [
        {
            title: 'Total Orders',
            value: '24',
            change: '+3 this month',
            icon: ShoppingCart,
            color: 'blue'
        },
        {
            title: 'Available Products',
            value: '156',
            change: '+12 new items',
            icon: Package,
            color: 'green'
        },
        {
            title: 'Monthly Sales',
            value: '$18,500',
            change: '+22% vs last month',
            icon: DollarSign,
            color: 'purple'
        },
        {
            title: 'Performance',
            value: '94%',
            change: 'Customer satisfaction',
            icon: TrendingUp,
            color: 'orange'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-blue-600">Harmony Surgitech</h1>
                            <span className="ml-4 text-lg text-gray-600">Distributor Portal</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-64"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <span className="text-gray-700">Welcome, {user?.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                                        <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                        <p className="text-xs text-gray-500">{stat.change}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((order) => (
                                    <div key={order} className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <div>
                                            <p className="font-medium text-gray-900">Order #D{1000 + order}</p>
                                            <p className="text-sm text-gray-600">Surgical Scalpel Set + {order} more items</p>
                                            <p className="text-xs text-gray-500">Ordered {order} days ago</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">${(order * 850).toLocaleString()}</p>
                                            <p className={`text-sm ${order <= 2 ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {order <= 2 ? 'Delivered' : 'In Transit'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                                Browse Products
                            </button>
                            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                                Place New Order
                            </button>
                            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                                View Inventory
                            </button>
                            <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                                Download Catalog
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Categories */}
                <div className="mt-8 bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Product Categories</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { name: 'Surgical Instruments', count: 45, image: '🔪' },
                                { name: 'Monitoring Equipment', count: 28, image: '📊' },
                                { name: 'Diagnostic Equipment', count: 33, image: '🔍' },
                                { name: 'Consumables', count: 42, image: '💉' },
                                { name: 'Protective Equipment', count: 18, image: '🧤' },
                                { name: 'Sterilization', count: 15, image: '🧽' }
                            ].map((category, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-3xl">{category.image}</div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{category.name}</h4>
                                            <p className="text-sm text-gray-600">{category.count} products</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="mt-8 bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                                <div className="text-sm text-gray-600">Order Accuracy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">2.1</div>
                                <div className="text-sm text-gray-600">Avg. Delivery Days</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
                                <div className="text-sm text-gray-600">Customer Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DistributorDashboard;
