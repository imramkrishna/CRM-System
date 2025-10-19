import {
    DollarSign,
    Search,
    History,
    Clock,
    CheckCircle,
    XCircle,
    Download
} from 'lucide-react';
import { useState } from 'react';
const Transactions = () => {
    const [searchQueries, setSearchQueries] = useState({
        transactions: '',
    });

    const handleSearchChange = (field: string, value: string) => {
        setSearchQueries((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="space-y-6 bg-gray-50/50 p-5 rounded-2xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex items-center space-x-3">
                        <History className="h-8 w-8 text-blue-600" />
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
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64"
                            />
                        </div>
                        <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                            <option>All Transactions</option>
                            <option>Completed</option>
                            <option>Pending</option>
                            <option>Cancelled</option>
                        </select>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Transaction Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-600 font-medium">Total Transactions</p>
                                <p className="text-2xl font-bold text-gray-900">1,247</p>
                            </div>
                            <History className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-600 font-medium">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">1,089</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-yellow-600 font-medium">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">143</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-600 font-medium">Total Value</p>
                                <p className="text-2xl font-bold text-gray-900">$1.8M</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-purple-500" />
                        </div>
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
    )
};

export default Transactions;