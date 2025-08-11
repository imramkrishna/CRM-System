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
const Payments = () => {
    const [searchQueries, setSearchQueries] = useState({
        payments: ''
    });

    const handleSearchChange = (section: string, value: string) => {
        setSearchQueries(prev => ({
            ...prev,
            [section]: value
        }));
    };

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
};

export default Payments;