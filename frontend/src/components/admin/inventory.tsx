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
const Inventory = () => {
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
}
export default Inventory;