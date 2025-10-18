import { DistributorApplication } from '@/types';
import {

    Search,
    UserCheck,
    Building,
    Phone,
    Mail,
    MapPin,
    RefreshCw,
    XCircle,
    CheckCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { post, get } from '@/lib/api';
import Loading from '../ui/buttons/Loading';
const VerifyDistributor = () => {
    const [isDistributorLoading, setIsDistributorLoading] = useState(true);
    const [distributors, setDistributors] = useState<DistributorApplication[]>([]);
    const [selectedDistributor, setSelectedDistributor] = useState<DistributorApplication | null>(null);
    const fetchDistributors = async () => {
        try {
            setIsDistributorLoading(true);
            const response = await get("/auth/pendingDistributors");
            console.log('Distributor response:', response.data); // Debug log
            const distributorsList = response.data.distributors || [];
            setDistributors(distributorsList);
            if (distributorsList && distributorsList.length > 0) {
                setSelectedDistributor(distributorsList[0]);
            }
        } catch (error) {
            console.error('Error fetching distributors:', error);
        } finally {
            setIsDistributorLoading(false);
        }
    };
    useEffect(() => {

        fetchDistributors();

    }, []);

    const handleApprove = async (distributor: DistributorApplication) => {
        try {
            const response = await post(`/auth/verifyDistributor`, { email: distributor.email });
            // Remove from pending list after approval
            setDistributors(prev => prev.filter(d => d.id !== distributor.id));
            if (distributors.length > 1) {
                const nextDistributor = distributors.find(d => d.id !== distributor.id);
                setSelectedDistributor(nextDistributor || null);
            } else {
                setSelectedDistributor(null);
            }
        } catch (error) {
            console.error('Error approving distributor:', error);
        }
    };

    const handleReject = async (distributor: DistributorApplication) => {
        try {
            const response = await post(`/auth/rejectDistributor`, { email: distributor.email });
            if (distributors.length > 1) {
                const nextDistributor = distributors.find(d => d.id !== distributor.id);
                setSelectedDistributor(nextDistributor || null);
            } else {
                setSelectedDistributor(null);
            }
        } catch (error) {
            console.error('Error rejecting distributor:', error);
        }
    };

    if (isDistributorLoading) {
        return (
            <Loading message="distributor applications" />
        );
    }

    if (!distributors.length) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">All Caught Up!</h2>
                    <p className="text-gray-600 mb-6">
                        No pending distributor applications to review at the moment.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                    >
                        <RefreshCw className="h-4 w-4" />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <UserCheck className="h-8 w-8 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Distributor Verification</h2>
                            <p className="text-gray-600">Review and verify pending distributor applications</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200">
                            <span className="text-sm font-medium text-indigo-700">
                                {distributors.length} Pending
                            </span>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search applications..."
                                className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm w-64 text-gray-900 placeholder-gray-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Applications List */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Pending Applications ({distributors.length})
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {distributors.map((distributor, index) => (
                                <div
                                    key={distributor.id || index}
                                    onClick={() => setSelectedDistributor(distributor)}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${selectedDistributor?.id === distributor.id
                                        ? 'border-indigo-500 bg-indigo-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">
                                                    {distributor.ownerName?.charAt(0) || 'D'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">
                                                {distributor.companyName || 'Company Name'}
                                            </p>
                                            <p className="text-xs text-gray-600 truncate">
                                                {distributor.ownerName || 'Owner Name'}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {distributor.email || 'Email'}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Application Details */}
                <div className="lg:col-span-2">
                    {selectedDistributor ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                        <span className="text-2xl font-bold">
                                            {selectedDistributor.companyName?.charAt(0) || 'C'}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{selectedDistributor.companyName}</h3>
                                        <p className="text-indigo-100">Distributor Application</p>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Owner Information */}
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                            <UserCheck className="h-5 w-5 text-indigo-600" />
                                            <span>Owner Information</span>
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <p className="text-gray-900 font-semibold">{selectedDistributor.ownerName || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Information */}
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                            <Building className="h-5 w-5 text-indigo-600" />
                                            <span>Company Details</span>
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                                <p className="text-gray-900 font-semibold">{selectedDistributor.companyName || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                            <Phone className="h-5 w-5 text-indigo-600" />
                                            <span>Contact Details</span>
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <div className="flex items-center space-x-2">
                                                    <Mail className="h-4 w-4 text-gray-500" />
                                                    <p className="text-gray-900">{selectedDistributor.email || 'Not provided'}</p>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="h-4 w-4 text-gray-500" />
                                                    <p className="text-gray-900">{selectedDistributor.phone || 'Not provided'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Information */}
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                            <MapPin className="h-5 w-5 text-indigo-600" />
                                            <span>Location</span>
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                                                <div className="flex items-start space-x-2">
                                                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                                    <p className="text-gray-900">{selectedDistributor.address || 'Not provided'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-600">
                                            Application submitted on {new Date().toLocaleDateString()}
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleReject(selectedDistributor)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                                            >
                                                <XCircle className="h-4 w-4" />
                                                <span>Reject Application</span>
                                            </button>
                                            <button
                                                onClick={() => handleApprove(selectedDistributor)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                <span>Approve Application</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UserCheck className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select an Application</h3>
                                <p className="text-gray-600">
                                    Choose a distributor application from the list to view details and take action.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default VerifyDistributor;
