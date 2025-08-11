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
const ManualRequest = () => {
    const [searchQueries, setSearchQueries] = useState({
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
};

export default ManualRequest;