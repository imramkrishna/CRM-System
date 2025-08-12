import { useState, useEffect } from "react";
import {
    Users,
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    Clock,
    UserPlus,
    UserCheck,
    MapPin,
    Phone,
    Mail
} from 'lucide-react';
import { get } from "@/lib/api";

interface Distributor {
    id: number;
    ownerName: string;
    companyName: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

interface DistributorsResponse {
    distributors: Distributor[];
}

const Customers = () => {
    const [distributors, setDistributors] = useState<Distributor[]>([]);
    const [filteredDistributors, setFilteredDistributors] = useState<Distributor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Search states for different sections
    const [searchQueries, setSearchQueries] = useState({
        customers: '',
    });

    const handleSearchChange = (section: string, value: string) => {
        setSearchQueries(prev => ({
            ...prev,
            [section]: value
        }));
    };

    const fetchDistributors = async () => {
        try {
            setLoading(true);
            const response = await get('/admin/distributors', {
                withCredentials: true
            });

            if (response.data && response.data.distributors) {
                setDistributors(response.data.distributors);
                setFilteredDistributors(response.data.distributors);
            }
        } catch (err) {
            console.error('Error fetching distributors:', err);
            setError('Failed to fetch distributors');
        } finally {
            setLoading(false);
        }
    };

    // Filter distributors based on search query
    useEffect(() => {
        if (!searchQueries.customers) {
            setFilteredDistributors(distributors);
        } else {
            const filtered = distributors.filter(distributor =>
                distributor.companyName.toLowerCase().includes(searchQueries.customers.toLowerCase()) ||
                distributor.ownerName.toLowerCase().includes(searchQueries.customers.toLowerCase()) ||
                distributor.email.toLowerCase().includes(searchQueries.customers.toLowerCase())
            );
            setFilteredDistributors(filtered);
        }
    }, [searchQueries.customers, distributors]);

    useEffect(() => {
        fetchDistributors();
    }, []);

    // Calculate metrics
    const totalDistributors = distributors.length;
    const activeDistributors = distributors.length; // All fetched distributors are active
    const newThisMonth = distributors.filter(dist => {
        const createdDate = new Date(dist.createdAt);
        const currentDate = new Date();
        return createdDate.getMonth() === currentDate.getMonth() &&
            createdDate.getFullYear() === currentDate.getFullYear();
    }).length;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAddress = (address: string) => {
        // Truncate long addresses
        return address.length > 50 ? address.substring(0, 50) + '...' : address;
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
                            <p className="text-2xl font-bold text-gray-900">{totalDistributors}</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-medium">Active</p>
                            <p className="text-2xl font-bold text-gray-900">{activeDistributors}</p>
                        </div>
                        <UserCheck className="h-8 w-8 text-green-500" />
                    </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-yellow-600 font-medium">New This Month</p>
                            <p className="text-2xl font-bold text-gray-900">{newThisMonth}</p>
                        </div>
                        <UserPlus className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-purple-600 font-medium">Search Results</p>
                            <p className="text-2xl font-bold text-gray-900">{filteredDistributors.length}</p>
                        </div>
                        <Search className="h-8 w-8 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Loading and Error States */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading distributors...</span>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                    <div className="text-red-800">{error}</div>
                </div>
            )}

            {/* Customer/Distributor List */}
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Company & Owner
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact Info
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined Date
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
                            {filteredDistributors.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        {searchQueries.customers ? 'No distributors found matching your search.' : 'No distributors found.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredDistributors.map((distributor) => (
                                    <tr key={distributor.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-blue-600">
                                                            {distributor.companyName.substring(0, 2).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {distributor.companyName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Owner: {distributor.ownerName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <div className="flex items-center mb-1">
                                                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="truncate" style={{ maxWidth: '200px' }}>
                                                        {distributor.email}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span>{distributor.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-start">
                                                <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                                <div className="text-sm text-gray-500 break-words" style={{ maxWidth: '200px' }}>
                                                    {formatAddress(distributor.address)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(distributor.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                                                    title="Edit Distributor"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                    title="Delete Distributor"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {!loading && !error && filteredDistributors.length > 0 && (
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing {filteredDistributors.length} of {totalDistributors} distributors
                        {searchQueries.customers && (
                            <span className="text-blue-600 ml-1">
                                (filtered by "{searchQueries.customers}")
                            </span>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
                            disabled={true} // Implement pagination logic here
                        >
                            Previous
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
                            1
                        </button>
                        <button
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
                            disabled={true} // Implement pagination logic here
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;