import React, { useState } from 'react'
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
const sellDetails = () => {

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
        verifyDistributor: '',
        reports: '',
        manualRequest: ''
    });
    const handleSearchChange = (section: string, value: string) => {
        setSearchQueries(prev => ({
            ...prev,
            [section]: value
        }));
    };
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
}

export default sellDetails
