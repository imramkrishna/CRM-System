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

const AdminDashboard = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    // Theme-related code removed
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Search states for different sections
    const [searchQueries, setSearchQueries] = useState({
        global: '',
        dashboard: '',
        customers: '',
        orders: '',
        inventory: '',
        sellDetails: '',
        purchases: '',
        quotation: '',
        transactions: '',
        payments: '',
        reports: '',
        manualRequest: ''
    });

    const handleSearchChange = (section: string, value: string) => {
        setSearchQueries(prev => ({
            ...prev,
            [section]: value
        }));
    };

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
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'manual-request', label: 'Manual Request', icon: FileText },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
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
        { id: 'transactions', label: 'Transaction History', icon: RefreshCw },
        { id: 'payments', label: 'Payment Management', icon: CreditCard },
        { id: 'reports', label: 'Reports', icon: FileBarChart }
    ];

    const stats = [
        {
            title: 'Total Products',
            value: '4,892',
            change: '+12%',
            trend: 'up',
            icon: Package,
            color: 'blue',
            bgGradient: 'bg-gradient-to-r from-blue-600 to-indigo-700',
            iconColor: 'text-white',
            chartColor: 'text-blue-200'
        },
        {
            title: 'Available Stock',
            value: '2,137',
            change: '+8%',
            trend: 'up',
            icon: BarChart3,
            color: 'green',
            bgGradient: 'bg-gradient-to-r from-emerald-500 to-green-600',
            iconColor: 'text-white',
            chartColor: 'text-emerald-200'
        },
        {
            title: 'Low Stock',
            value: '1,952',
            change: '-15%',
            trend: 'down',
            icon: AlertTriangle,
            color: 'yellow',
            bgGradient: 'bg-gradient-to-r from-amber-500 to-yellow-500',
            iconColor: 'text-white',
            chartColor: 'text-amber-200'
        },
        {
            title: 'Out of Stock',
            value: '803',
            change: '-5%',
            trend: 'down',
            icon: Package,
            color: 'red',
            bgGradient: 'bg-gradient-to-r from-rose-500 to-red-600',
            iconColor: 'text-white',
            chartColor: 'text-rose-200'
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
        <div className="space-y-6 bg-gray-50/50 p-5 rounded-2xl">
            {/* Search */}
            <div className="relative mb-6">
                <div className="flex items-center">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search in dashboard..."
                        value={searchQueries['dashboard'] || ''}
                        onChange={(e) => handleSearchChange('dashboard', e.target.value)}
                        className="pl-10 pr-4 py-3 bg-white border border-gray-200 w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-1">26K</h3>
                            <div className="flex items-center gap-1 opacity-80 text-sm">
                                <span className="text-red-300">(-12.4%</span>
                                <ArrowDownRight className="h-3 w-3" />
                                <span>)</span>
                            </div>
                            <p className="text-white/80 mt-1">Total Products</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-indigo-500/30 flex items-center justify-center">
                            <Package className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="absolute right-1 bottom-0 opacity-70">
                        <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="text-white/20">
                            <path d="M0 50 C20 50, 20 30, 30 30 S40 20, 50 20 S60 30, 70 30 S80 20, 90 20 L90 50 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                            <circle cx="30" cy="30" r="2" fill="currentColor" />
                            <circle cx="50" cy="20" r="2" fill="currentColor" />
                            <circle cx="70" cy="30" r="2" fill="currentColor" />
                            <circle cx="90" cy="20" r="2" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-1">$6,200</h3>
                            <div className="flex items-center gap-1 opacity-80 text-sm">
                                <span className="text-green-200">(+40.9%</span>
                                <ArrowUpRight className="h-3 w-3" />
                                <span>)</span>
                            </div>
                            <p className="text-white/80 mt-1">Available Stock</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-500/30 flex items-center justify-center">
                            <BarChart3 className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="absolute right-1 bottom-0 opacity-70">
                        <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="text-white/20">
                            <path d="M0 40 C10 40, 15 35, 20 30 S30 20, 40 25 S50 35, 60 30 S70 15, 80 15 S90 20, 100 25" stroke="currentColor" strokeWidth="2" fill="none" />
                            <circle cx="20" cy="30" r="2" fill="currentColor" />
                            <circle cx="40" cy="25" r="2" fill="currentColor" />
                            <circle cx="60" cy="30" r="2" fill="currentColor" />
                            <circle cx="80" cy="15" r="2" fill="currentColor" />
                            <circle cx="100" cy="25" r="2" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-1">2.49%</h3>
                            <div className="flex items-center gap-1 opacity-80 text-sm">
                                <span className="text-green-200">(+34.7%</span>
                                <ArrowUpRight className="h-3 w-3" />
                                <span>)</span>
                            </div>
                            <p className="text-white/80 mt-1">Low Stock</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-amber-500/30 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="absolute right-1 bottom-0 opacity-70">
                        <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="text-white/20">
                            <path d="M0 30 C10 30, 20 20, 30 25 S40 40, 50 45 S60 10, 70 25 S80 40, 90 30 S100 25, 100 25" stroke="currentColor" strokeWidth="2" fill="none" />
                            <circle cx="30" cy="25" r="2" fill="currentColor" />
                            <circle cx="50" cy="45" r="2" fill="currentColor" />
                            <circle cx="70" cy="25" r="2" fill="currentColor" />
                            <circle cx="90" cy="30" r="2" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-1">44K</h3>
                            <div className="flex items-center gap-1 opacity-80 text-sm">
                                <span className="text-red-300">(-23.6%</span>
                                <ArrowDownRight className="h-3 w-3" />
                                <span>)</span>
                            </div>
                            <p className="text-white/80 mt-1">Out of Stock</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-rose-500/30 flex items-center justify-center">
                            <Package className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="absolute right-1 bottom-0 opacity-70">
                        <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="text-white/20">
                            <rect x="10" y="20" width="5" height="30" rx="1" fill="currentColor" />
                            <rect x="20" y="25" width="5" height="25" rx="1" fill="currentColor" />
                            <rect x="30" y="15" width="5" height="35" rx="1" fill="currentColor" />
                            <rect x="40" y="30" width="5" height="20" rx="1" fill="currentColor" />
                            <rect x="50" y="20" width="5" height="30" rx="1" fill="currentColor" />
                            <rect x="60" y="25" width="5" height="25" rx="1" fill="currentColor" />
                            <rect x="70" y="10" width="5" height="40" rx="1" fill="currentColor" />
                            <rect x="80" y="20" width="5" height="30" rx="1" fill="currentColor" />
                            <rect x="90" y="15" width="5" height="35" rx="1" fill="currentColor" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-md text-white shadow-sm">
                                <BarChart3 className="h-4 w-4" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm bg-blue-50 hover:bg-blue-100 transition-colors px-3 py-1.5 rounded-md">
                            <span>View All</span>
                            <ChevronDown className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-5">
                            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-blue-50/40 transition-colors">
                                <div className="flex-shrink-0">
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
                                        <ShoppingCart className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">New order received</h4>
                                    <p className="text-gray-600">Order #35782 from Memorial Hospital</p>
                                    <p className="text-sm text-gray-500 mt-1">10 minutes ago</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-green-50/40 transition-colors">
                                <div className="flex-shrink-0">
                                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-sm">
                                        <DollarSign className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Payment received</h4>
                                    <p className="text-gray-600">Payment of $12,580 received from City Medical</p>
                                    <p className="text-sm text-gray-500 mt-1">45 minutes ago</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-purple-50/40 transition-colors">
                                <div className="flex-shrink-0">
                                    <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-sm">
                                        <Package className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Inventory updated</h4>
                                    <p className="text-gray-600">15 items added to Surgical Instruments</p>
                                    <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-orange-50/40 transition-colors">
                                <div className="flex-shrink-0">
                                    <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-sm">
                                        <UserPlus className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">New distributor application</h4>
                                    <p className="text-gray-600">MediEquip Inc. submitted an application</p>
                                    <p className="text-sm text-gray-500 mt-1">4 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-green-50/40 transition-colors">
                                <div className="flex-shrink-0">
                                    <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-sm">
                                        <CheckCircle className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Quotation approved</h4>
                                    <p className="text-gray-600">Quotation #QT-234 was approved</p>
                                    <p className="text-sm text-gray-500 mt-1">Yesterday</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-md text-white shadow-sm">
                                <ShoppingCart className="h-4 w-4" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Order Summary</h3>
                        </div>
                        <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                            This Month
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="mb-8">
                            <div className="flex flex-col items-center">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">$8,870</h2>
                                <div className="inline-flex items-center text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full px-3 py-1.5 shadow-sm">
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                    <span className="text-sm font-medium">$2.6k vs last month</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mt-2">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                                    <span className="text-gray-600">Direct Sales</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-900">27%</span>
                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '27%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
                                    <span className="text-gray-600">Distributors</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-900">53%</span>
                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '53%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                                    <span className="text-gray-600">Online Orders</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-900">18%</span>
                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" style={{ width: '18%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-sm"></div>
                                    <span className="text-gray-600">International</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-900">10%</span>
                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{ width: '10%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stock Level and Upcoming Restock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Stock Level */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-md text-white shadow-sm">
                                <BarChart3 className="h-4 w-4" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Stock Level</h3>
                        </div>
                        <div className="flex gap-2">
                            <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                                This Week
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col items-center mb-8">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mb-3">
                                <span className="text-xl font-bold text-white">225</span>
                            </div>
                            <span className="inline-flex items-center bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                                <Check className="h-4 w-4 mr-1" />
                                In Stock
                            </span>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-gray-900">Surgical Scalpel Set</span>
                                    <span className="text-sm text-blue-600 font-medium">52 of 100 remaining</span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                                        style={{ width: '52%' }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-gray-900">Digital Blood Pressure Monitor</span>
                                    <span className="text-sm text-yellow-600 font-medium">42 of 100 remaining</span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                                        style={{ width: '42%' }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-gray-900">Disposable Syringes</span>
                                    <span className="text-sm text-green-600 font-medium">65 of 100 remaining</span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                                        style={{ width: '65%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Restock */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-md text-white shadow-sm">
                                <Clock className="h-4 w-4" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Upcoming Restock</h3>
                        </div>
                        <div className="flex gap-2">
                            <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                                Next 60 Days
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {upcomingRestock.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 rounded-xl shadow-sm border border-gray-100 bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-12 rounded-full ${item.status === 'urgent'
                                            ? 'bg-gradient-to-b from-red-400 to-red-600'
                                            : 'bg-gradient-to-b from-yellow-400 to-yellow-600'
                                            }`}></div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.product}</h4>
                                            <div className="flex items-center mt-1 text-sm text-gray-600">
                                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                                Arriving in {item.days}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${item.status === 'urgent'
                                            ? 'bg-red-50 text-red-700'
                                            : 'bg-yellow-50 text-yellow-700'
                                            }`}>
                                            {item.status === 'urgent' ? (
                                                <>
                                                    <AlertTriangle className="h-4 w-4 mr-1.5" />
                                                    Urgent
                                                </>
                                            ) : (
                                                <>
                                                    <Clock className="h-4 w-4 mr-1.5" />
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <History className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View All
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium shadow-sm ${index % 4 === 0 ? 'bg-gradient-to-br from-blue-400 to-indigo-600 text-white' :
                                    index % 4 === 1 ? 'bg-gradient-to-br from-green-400 to-teal-600 text-white' :
                                        index % 4 === 2 ? 'bg-gradient-to-br from-purple-400 to-pink-600 text-white' :
                                            'bg-gradient-to-br from-orange-400 to-amber-600 text-white'
                                    }`}>
                                    {activity.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900">
                                        <span className="font-bold">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1.5 flex items-center">
                                        <Clock className="h-3.5 w-3.5 mr-1.5" />
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
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
                                <div className="flex items-center space-x-3">
                                    <TrendingUp className="h-8 w-8 text-blue-600" />
                                    <h2 className="text-xl font-bold text-gray-900">Sell Details</h2>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search sales..."
                                        value={searchQueries.sellDetails}
                                        onChange={(e) => handleSearchChange('sellDetails', e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-64 text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                            </div>
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
                                        value={searchQueries.customers}
                                        onChange={(e) => handleSearchChange('customers', e.target.value)}
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
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Total Distributors</p>
                                        <p className="text-2xl font-bold text-gray-900">254</p>
                                    </div>
                                    <Users className="h-8 w-8 text-blue-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Active</p>
                                        <p className="text-2xl font-bold text-gray-900">186</p>
                                    </div>
                                    <UserCheck className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-yellow-600 font-medium">New This Month</p>
                                        <p className="text-2xl font-bold text-gray-900">15</p>
                                    </div>
                                    <UserPlus className="h-8 w-8 text-yellow-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-red-600 font-medium">Pending Approval</p>
                                        <p className="text-2xl font-bold text-gray-900">8</p>
                                    </div>
                                    <Clock className="h-8 w-8 text-red-500" />
                                </div>
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

            case 'orders':
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

            case 'inventory':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center space-x-3">
                                <Package className="h-8 w-8 text-blue-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQueries.inventory}
                                        onChange={(e) => handleSearchChange('inventory', e.target.value)}
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
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Total Products</p>
                                        <p className="text-2xl font-bold text-gray-900">4,892</p>
                                    </div>
                                    <Package className="h-8 w-8 text-blue-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">In Stock</p>
                                        <p className="text-2xl font-bold text-gray-900">3,241</p>
                                    </div>
                                    <Check className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-yellow-600 font-medium">Low Stock</p>
                                        <p className="text-2xl font-bold text-gray-900">126</p>
                                    </div>
                                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-red-600 font-medium">Out of Stock</p>
                                        <p className="text-2xl font-bold text-gray-900">89</p>
                                    </div>
                                    <X className="h-8 w-8 text-red-500" />
                                </div>
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
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center space-x-3">
                                <FileText className="h-8 w-8 text-blue-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Manual Request</h2>
                            </div>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search requests..."
                                        value={searchQueries.manualRequest}
                                        onChange={(e) => handleSearchChange('manualRequest', e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-full text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>New Request</span>
                                </button>
                            </div>
                        </div>

                        {/* Request Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Total Requests</p>
                                        <p className="text-2xl font-bold text-gray-900">142</p>
                                    </div>
                                    <FileText className="h-8 w-8 text-blue-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Completed</p>
                                        <p className="text-2xl font-bold text-gray-900">89</p>
                                    </div>
                                    <Check className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-yellow-600 font-medium">Pending</p>
                                        <p className="text-2xl font-bold text-gray-900">38</p>
                                    </div>
                                    <Clock className="h-8 w-8 text-yellow-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-red-600 font-medium">Urgent</p>
                                        <p className="text-2xl font-bold text-gray-900">15</p>
                                    </div>
                                    <AlertTriangle className="h-8 w-8 text-red-500" />
                                </div>
                            </div>
                        </div>

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
            case 'purchases':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center space-x-3">
                                <ShoppingBag className="h-8 w-8 text-blue-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Purchase Management</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search purchases..."
                                        value={searchQueries.purchases}
                                        onChange={(e) => handleSearchChange('purchases', e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-64 text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>New Purchase</span>
                                </button>
                            </div>
                        </div>

                        {/* Purchase Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Total Purchases</p>
                                        <p className="text-2xl font-bold text-gray-900">1,783</p>
                                    </div>
                                    <ShoppingBag className="h-8 w-8 text-blue-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Completed</p>
                                        <p className="text-2xl font-bold text-gray-900">1,521</p>
                                    </div>
                                    <Check className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-yellow-600 font-medium">Pending</p>
                                        <p className="text-2xl font-bold text-gray-900">187</p>
                                    </div>
                                    <Clock className="h-8 w-8 text-yellow-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-purple-600 font-medium">Total Value</p>
                                        <p className="text-2xl font-bold text-gray-900">$3.6M</p>
                                    </div>
                                    <DollarSign className="h-8 w-8 text-purple-500" />
                                </div>
                            </div>
                        </div>

                        {/* Purchase Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Purchase ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Supplier
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Items
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Value
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
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
                                        { id: 'PUR-001', supplier: 'Medical Supplies Co.', items: 'Surgical Equipment', value: '$12,450', date: '2025-08-05', status: 'Completed' },
                                        { id: 'PUR-002', supplier: 'Healthcare Products Ltd', items: 'Diagnostic Tools', value: '$8,320', date: '2025-08-03', status: 'Pending' },
                                        { id: 'PUR-003', supplier: 'Surgical Instruments Inc', items: 'Surgical Kits', value: '$15,780', date: '2025-08-01', status: 'Completed' },
                                        { id: 'PUR-004', supplier: 'MediTech Global', items: 'Monitoring Equipment', value: '$23,150', date: '2025-07-28', status: 'Completed' },
                                        { id: 'PUR-005', supplier: 'Healthcare Innovations', items: 'Surgical Instruments', value: '$9,870', date: '2025-07-25', status: 'Processing' }
                                    ].filter(purchase =>
                                        searchQueries.purchases === '' ||
                                        purchase.id.toLowerCase().includes(searchQueries.purchases.toLowerCase()) ||
                                        purchase.supplier.toLowerCase().includes(searchQueries.purchases.toLowerCase()) ||
                                        purchase.items.toLowerCase().includes(searchQueries.purchases.toLowerCase())
                                    ).map((purchase, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-blue-600">{purchase.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{purchase.supplier}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{purchase.items}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">{purchase.value}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{purchase.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${purchase.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    purchase.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {purchase.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Showing 1 to 5 of 24 purchases
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Previous</button>
                                <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">2</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">3</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Next</button>
                            </div>
                        </div>
                    </div>
                );
            case 'quotation':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center space-x-3">
                                <FileText className="h-8 w-8 text-indigo-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Quotation Management</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search quotations..."
                                        value={searchQueries.quotation}
                                        onChange={(e) => handleSearchChange('quotation', e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-64 text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </button>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Create Quotation</span>
                                </button>
                            </div>
                        </div>

                        {/* Quotation Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-indigo-600 font-medium">Total Quotations</p>
                                        <p className="text-2xl font-bold text-gray-900">532</p>
                                    </div>
                                    <FileText className="h-8 w-8 text-indigo-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Accepted</p>
                                        <p className="text-2xl font-bold text-gray-900">289</p>
                                    </div>
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-yellow-600 font-medium">Pending</p>
                                        <p className="text-2xl font-bold text-gray-900">158</p>
                                    </div>
                                    <Clock className="h-8 w-8 text-yellow-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-red-600 font-medium">Rejected</p>
                                        <p className="text-2xl font-bold text-gray-900">85</p>
                                    </div>
                                    <XCircle className="h-8 w-8 text-red-500" />
                                </div>
                            </div>
                        </div>

                        {/* Quotation Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quote ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Products
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
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
                                        { id: 'QT-001', customer: 'Memorial Hospital', products: 'Surgical Implants', total: '$8,750', date: '2025-08-06', status: 'Pending' },
                                        { id: 'QT-002', customer: 'City Medical Center', products: 'Orthopedic Tools', total: '$12,320', date: '2025-08-05', status: 'Accepted' },
                                        { id: 'QT-003', customer: 'Regional Healthcare', products: 'Surgical Equipment', total: '$24,150', date: '2025-08-04', status: 'Accepted' },
                                        { id: 'QT-004', customer: 'University Hospital', products: 'Diagnostic Kits', total: '$9,870', date: '2025-08-02', status: 'Rejected' },
                                        { id: 'QT-005', customer: 'Private Clinic Group', products: 'Surgical Tools', total: '$16,530', date: '2025-08-01', status: 'Pending' }
                                    ].filter(quote =>
                                        searchQueries.quotation === '' ||
                                        quote.id.toLowerCase().includes(searchQueries.quotation.toLowerCase()) ||
                                        quote.customer.toLowerCase().includes(searchQueries.quotation.toLowerCase()) ||
                                        quote.products.toLowerCase().includes(searchQueries.quotation.toLowerCase())
                                    ).map((quote, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-indigo-600">{quote.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{quote.customer}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{quote.products}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">{quote.total}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{quote.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${quote.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                                                    quote.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {quote.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-900">
                                                        <Printer className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Showing 1 to 5 of 532 quotations
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Previous</button>
                                <button className="px-3 py-1 bg-indigo-600 text-white rounded-md">1</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">2</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">3</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Next</button>
                            </div>
                        </div>
                    </div>
                );
            case 'transactions':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center space-x-3">
                                <RefreshCw className="h-8 w-8 text-teal-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search transactions..."
                                        value={searchQueries.transactions}
                                        onChange={(e) => handleSearchChange('transactions', e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-64 text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="date"
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                                    />
                                </div>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </button>
                                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Download className="h-4 w-4" />
                                    <span>Export</span>
                                </button>
                            </div>
                        </div>

                        {/* Transaction Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-teal-600 font-medium">Total Transactions</p>
                                        <p className="text-2xl font-bold text-gray-900">3,476</p>
                                    </div>
                                    <RefreshCw className="h-8 w-8 text-teal-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Income</p>
                                        <div className="flex items-center">
                                            <p className="text-2xl font-bold text-gray-900">$852,430</p>
                                            <span className="ml-2 flex items-center text-green-600 text-xs">
                                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                                5.3%
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-red-600 font-medium">Expenses</p>
                                        <div className="flex items-center">
                                            <p className="text-2xl font-bold text-gray-900">$268,720</p>
                                            <span className="ml-2 flex items-center text-red-600 text-xs">
                                                <ArrowDownRight className="h-3 w-3 mr-1" />
                                                2.8%
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowDownRight className="h-8 w-8 text-red-500" />
                                </div>
                            </div>
                        </div>

                        {/* Transaction Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Transaction ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
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
                                        {
                                            id: 'TRX-001',
                                            date: '2025-08-06 09:32 AM',
                                            description: 'Order payment from City Medical Center',
                                            category: 'Sales',
                                            amount: '+$12,560.00',
                                            type: 'income',
                                            status: 'Completed'
                                        },
                                        {
                                            id: 'TRX-002',
                                            date: '2025-08-05 11:15 AM',
                                            description: 'Supplier payment to MedSupplies Inc.',
                                            category: 'Purchase',
                                            amount: '-$8,750.00',
                                            type: 'expense',
                                            status: 'Completed'
                                        },
                                        {
                                            id: 'TRX-003',
                                            date: '2025-08-04 03:45 PM',
                                            description: 'Order payment from Regional Hospital',
                                            category: 'Sales',
                                            amount: '+$23,450.00',
                                            type: 'income',
                                            status: 'Completed'
                                        },
                                        {
                                            id: 'TRX-004',
                                            date: '2025-08-03 02:20 PM',
                                            description: 'Monthly office rent payment',
                                            category: 'Expense',
                                            amount: '-$3,500.00',
                                            type: 'expense',
                                            status: 'Completed'
                                        },
                                        {
                                            id: 'TRX-005',
                                            date: '2025-08-02 10:10 AM',
                                            description: 'Refund to Memorial Hospital',
                                            category: 'Refund',
                                            amount: '-$4,200.00',
                                            type: 'expense',
                                            status: 'Processing'
                                        }
                                    ].filter(transaction =>
                                        searchQueries.transactions === '' ||
                                        transaction.id.toLowerCase().includes(searchQueries.transactions.toLowerCase()) ||
                                        transaction.description.toLowerCase().includes(searchQueries.transactions.toLowerCase()) ||
                                        transaction.category.toLowerCase().includes(searchQueries.transactions.toLowerCase())
                                    ).map((transaction, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-teal-600">{transaction.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{transaction.date}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{transaction.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.category === 'Sales' ? 'bg-blue-100 text-blue-800' :
                                                    transaction.category === 'Purchase' ? 'bg-purple-100 text-purple-800' :
                                                        transaction.category === 'Refund' ? 'bg-orange-100 text-orange-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {transaction.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                                    }`}>{transaction.amount}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button className="text-teal-600 hover:text-teal-900">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <Printer className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Showing 1 to 5 of 3,476 transactions
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Previous</button>
                                <button className="px-3 py-1 bg-teal-600 text-white rounded-md">1</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">2</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">3</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Next</button>
                            </div>
                        </div>
                    </div>
                );
            case 'payments':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center space-x-3">
                                <CreditCard className="h-8 w-8 text-violet-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search payments..."
                                        value={searchQueries.payments}
                                        onChange={(e) => handleSearchChange('payments', e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-64 text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="date"
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                                    />
                                </div>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </button>
                                <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Record Payment</span>
                                </button>
                            </div>
                        </div>

                        {/* Payment Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-violet-50 rounded-lg border border-violet-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-violet-600 font-medium">Total Payments</p>
                                        <p className="text-2xl font-bold text-gray-900">2,456</p>
                                    </div>
                                    <CreditCard className="h-8 w-8 text-violet-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Received</p>
                                        <p className="text-2xl font-bold text-gray-900">$683,240</p>
                                    </div>
                                    <Check className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-yellow-600 font-medium">Pending</p>
                                        <p className="text-2xl font-bold text-gray-900">$124,590</p>
                                    </div>
                                    <Clock className="h-8 w-8 text-yellow-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Overdue</p>
                                        <p className="text-2xl font-bold text-gray-900">$42,780</p>
                                    </div>
                                    <AlertTriangle className="h-8 w-8 text-blue-500" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment Method
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
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
                                            id: 'PAY-001',
                                            customer: 'Memorial Hospital',
                                            orderId: 'ORD-245',
                                            amount: '$12,450.00',
                                            method: 'Bank Transfer',
                                            date: '2025-08-06',
                                            status: 'Completed'
                                        },
                                        {
                                            id: 'PAY-002',
                                            customer: 'City Medical Center',
                                            orderId: 'ORD-233',
                                            amount: '$8,790.00',
                                            method: 'Credit Card',
                                            date: '2025-08-05',
                                            status: 'Completed'
                                        },
                                        {
                                            id: 'PAY-003',
                                            customer: 'Regional Healthcare',
                                            orderId: 'ORD-227',
                                            amount: '$15,320.00',
                                            method: 'Bank Transfer',
                                            date: '2025-08-03',
                                            status: 'Pending'
                                        },
                                        {
                                            id: 'PAY-004',
                                            customer: 'University Hospital',
                                            orderId: 'ORD-219',
                                            amount: '$23,150.00',
                                            method: 'Bank Transfer',
                                            date: '2025-08-01',
                                            status: 'Pending'
                                        },
                                        {
                                            id: 'PAY-005',
                                            customer: 'Private Clinic Group',
                                            orderId: 'ORD-210',
                                            amount: '$7,850.00',
                                            method: 'Credit Card',
                                            date: '2025-07-29',
                                            status: 'Failed'
                                        }
                                    ].filter(payment =>
                                        searchQueries.payments === '' ||
                                        payment.id.toLowerCase().includes(searchQueries.payments.toLowerCase()) ||
                                        payment.customer.toLowerCase().includes(searchQueries.payments.toLowerCase()) ||
                                        payment.orderId.toLowerCase().includes(searchQueries.payments.toLowerCase()) ||
                                        payment.method.toLowerCase().includes(searchQueries.payments.toLowerCase())
                                    ).map((payment, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-violet-600">{payment.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{payment.customer}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-blue-600">{payment.orderId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">{payment.amount}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{payment.method}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{payment.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button className="text-violet-600 hover:text-violet-900">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <Printer className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Showing 1 to 5 of 2,456 payments
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Previous</button>
                                <button className="px-3 py-1 bg-violet-600 text-white rounded-md">1</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">2</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">3</button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Next</button>
                            </div>
                        </div>
                    </div>
                );
            case 'reports':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center space-x-3">
                                <FileBarChart className="h-8 w-8 text-emerald-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="date"
                                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                                    />
                                </div>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </button>
                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <Download className="h-4 w-4" />
                                    <span>Export Reports</span>
                                </button>
                            </div>
                        </div>

                        {/* Report Navigation Tabs */}
                        <div className="mb-6 border-b border-gray-200">
                            <div className="flex space-x-6">
                                <button className="px-2 py-3 border-b-2 border-emerald-600 font-medium text-emerald-600">
                                    Sales Report
                                </button>
                                <button className="px-2 py-3 text-gray-600 hover:text-gray-900">
                                    Inventory Report
                                </button>
                                <button className="px-2 py-3 text-gray-600 hover:text-gray-900">
                                    Financial Report
                                </button>
                                <button className="px-2 py-3 text-gray-600 hover:text-gray-900">
                                    Customer Insights
                                </button>
                            </div>
                        </div>

                        {/* Report Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-emerald-600 font-medium">Total Sales</p>
                                        <p className="text-2xl font-bold text-gray-900">$1.24M</p>
                                    </div>
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <TrendingUp className="h-6 w-6 text-emerald-600" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center text-sm">
                                    <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
                                    <span className="text-emerald-600 font-medium">12.5%</span>
                                    <span className="text-gray-600 ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Orders</p>
                                        <p className="text-2xl font-bold text-gray-900">846</p>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <ShoppingCart className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center text-sm">
                                    <ArrowUpRight className="h-3 w-3 text-blue-600 mr-1" />
                                    <span className="text-blue-600 font-medium">8.2%</span>
                                    <span className="text-gray-600 ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-purple-600 font-medium">Avg. Order Value</p>
                                        <p className="text-2xl font-bold text-gray-900">$1,465</p>
                                    </div>
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <DollarSign className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center text-sm">
                                    <ArrowUpRight className="h-3 w-3 text-purple-600 mr-1" />
                                    <span className="text-purple-600 font-medium">4.3%</span>
                                    <span className="text-gray-600 ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-orange-600 font-medium">Active Customers</p>
                                        <p className="text-2xl font-bold text-gray-900">194</p>
                                    </div>
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Users className="h-6 w-6 text-orange-600" />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center text-sm">
                                    <ArrowUpRight className="h-3 w-3 text-orange-600 mr-1" />
                                    <span className="text-orange-600 font-medium">6.8%</span>
                                    <span className="text-gray-600 ml-1">vs last month</span>
                                </div>
                            </div>
                        </div>

                        {/* Sales Graph */}
                        <div className="mb-6 bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-900">Monthly Sales Trend</h3>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full">2025</button>
                                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">2024</button>
                                </div>
                            </div>
                            <div className="h-80 flex items-end space-x-4 mt-4 pt-10 border-t border-l border-gray-200 relative">
                                {/* Y-Axis Labels */}
                                <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2 text-xs text-gray-600">
                                    <span>$200K</span>
                                    <span>$150K</span>
                                    <span>$100K</span>
                                    <span>$50K</span>
                                    <span>$0</span>
                                </div>

                                {/* X-Axis with Bars */}
                                <div className="flex-1 flex items-end justify-around pl-10">
                                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div className="w-12 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-sm"
                                                style={{
                                                    height: `${[60, 85, 70, 95, 110, 130, 125, 140][index]}%`,
                                                    maxHeight: "90%"
                                                }}>
                                            </div>
                                            <span className="mt-2 text-xs font-medium text-gray-600">{month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Performance */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white rounded-lg border border-gray-100 p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-gray-900">Top Selling Products</h3>
                                    <button className="text-sm text-emerald-600">View All</button>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { name: "Surgical Instruments Kit A", sales: 185, growth: "+12%", amount: "$56,200" },
                                        { name: "Advanced Monitoring System", sales: 120, growth: "+8%", amount: "$43,800" },
                                        { name: "Diagnostic Equipment Set", sales: 95, growth: "+15%", amount: "$38,450" },
                                        { name: "Orthopedic Implants", sales: 78, growth: "+5%", amount: "$32,760" },
                                        { name: "Sterilization Equipment", sales: 64, growth: "+10%", amount: "$28,350" }
                                    ].map((product, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">{product.name}</p>
                                                <div className="flex items-center mt-1">
                                                    <span className="text-xs text-gray-600">{product.sales} units</span>
                                                    <span className="mx-2 text-gray-300">•</span>
                                                    <span className="text-xs text-emerald-600">{product.growth}</span>
                                                </div>
                                            </div>
                                            <span className="font-semibold text-gray-900">{product.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-100 p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-gray-900">Sales by Region</h3>
                                    <button className="text-sm text-emerald-600">View All</button>
                                </div>
                                <div className="h-64 flex items-center justify-center">
                                    {/* Simple donut chart */}
                                    <div className="relative w-48 h-48">
                                        <svg viewBox="0 0 36 36" className="w-full h-full">
                                            <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#d1fae5" strokeWidth="3"></circle>
                                            <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="3" strokeDasharray="40 100" strokeDashoffset="25"></circle>
                                            <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="3" strokeDasharray="25 100" strokeDashoffset="85"></circle>
                                            <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="15 100" strokeDashoffset="60"></circle>
                                            <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 100" strokeDashoffset="45"></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-lg font-bold text-gray-900">$1.24M</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-900">North (40%)</p>
                                            <p className="text-xs text-gray-600">$496K</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-900">East (25%)</p>
                                            <p className="text-xs text-gray-600">$310K</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-900">South (15%)</p>
                                            <p className="text-xs text-gray-600">$186K</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-900">West (10%)</p>
                                            <p className="text-xs text-gray-600">$124K</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Sales Table */}
                        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                            <div className="p-5 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Recent Sales</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Product
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
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[
                                            { id: "ORD-7865", customer: "Memorial Hospital", product: "Surgical Kits", date: "Aug 08, 2025", amount: "$12,580", status: "Completed" },
                                            { id: "ORD-7864", customer: "City Medical Center", product: "Monitoring Systems", date: "Aug 07, 2025", amount: "$8,790", status: "Completed" },
                                            { id: "ORD-7863", customer: "Regional Healthcare", product: "Diagnostic Equipment", date: "Aug 07, 2025", amount: "$15,450", status: "Processing" },
                                            { id: "ORD-7862", customer: "University Hospital", product: "Sterilization Units", date: "Aug 06, 2025", amount: "$23,100", status: "Completed" },
                                            { id: "ORD-7861", customer: "Private Clinic Group", product: "Surgical Instruments", date: "Aug 05, 2025", amount: "$6,720", status: "Processing" }
                                        ].map((order, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-blue-600">{order.id}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{order.customer}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-700">{order.product}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-700">{order.date}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900">{order.amount}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-gray-100 flex justify-center">
                                <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                                    View All Sales Reports
                                </button>
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
            <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out shadow-xl`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header - Logo */}
                    <div className="flex items-center h-20 px-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 to-slate-900">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-md flex items-center justify-center text-white shadow-lg border border-blue-400/20">
                                <Package className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="font-bold text-base text-white">Harmony Surgitech</h1>
                                <p className="text-xs text-blue-300">Admin Dashboard</p>
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
                                <div key={item.id}>
                                    <button
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-all duration-200 group ${activeSection === item.id
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
                                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                                            }`}
                                    >
                                        <div className={`p-1.5 rounded-md ${activeSection === item.id ? 'bg-white/20' : 'bg-slate-800'}`}>
                                            <Icon className={`h-4 w-4 ${activeSection === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                                        </div>
                                        <span className="text-sm font-medium">{item.label}</span>
                                        {item.submenu && <ChevronDown className={`h-4 w-4 ml-auto ${activeSection === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />}
                                        {activeSection === item.id && !item.submenu && (
                                            <div className="ml-auto w-1.5 h-6 bg-blue-400 rounded-sm"></div>
                                        )}
                                    </button>
                                    {item.submenu && activeSection === item.id && (
                                        <div className="ml-9 mt-2 space-y-1 py-1 border-l-2 border-slate-700 pl-2">
                                            {item.submenu.map((subItem) => (
                                                <button
                                                    key={subItem.id}
                                                    className="w-full text-left px-3 py-2.5 text-xs text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-md transition-all flex items-center space-x-2 group"
                                                >
                                                    <div className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-blue-400"></div>
                                                    <span>{subItem.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="px-3 py-4 border-t border-slate-800 mt-auto bg-gradient-to-b from-slate-900 to-slate-950">
                        <div className="flex items-center space-x-3 mb-4 p-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-md ring-2 ring-blue-500/20">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
                                <div className="flex items-center text-xs text-blue-300 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                                    Super Admin
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium text-slate-200 hover:text-red-300 hover:bg-slate-800 rounded-lg transition-all duration-200 border border-slate-700 hover:border-red-400/50 shadow-sm hover:shadow"
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
                                    placeholder="Search across all sections..."
                                    value={searchQueries['global'] || ''}
                                    onChange={(e) => handleSearchChange('global', e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64 text-gray-900 placeholder-gray-500"
                                />
                            </div>

                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative transition-colors">
                                <Search className="h-5 w-5 sm:hidden" />
                                <Bell className="h-5 w-5 hidden sm:block" />
                                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
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
                <div className="h-6"></div> {/* Increased spacer height */}

                {/* Page Content */}
                <main className="p-5 bg-gray-50 min-h-[calc(100vh-5.5rem)]">
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
