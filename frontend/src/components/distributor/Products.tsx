import {
    Package,
    ShoppingCart,
    TrendingUp,
    DollarSign,
    LogOut,
    Search,
    LayoutDashboard,
    History,
    Menu,
    X,
    ChevronDown,
    Bell,
    BarChart3,
    AlertTriangle,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    Users,
    Star,
    Building,
    Phone,
    Mail,
    MapPin,
    Plus,
    Filter,
    Download,
    Eye,
    Edit,
    Trash2,
    Check,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { useState } from 'react';
const Products = () => {
    const [searchQueries, setSearchQueries] = useState({
        products: '',
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
                        <Package className="h-8 w-8 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Available Products</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQueries.products}
                                onChange={(e) => handleSearchChange('products', e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64"
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Product Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-600 font-medium">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900">2,847</p>
                            </div>
                            <Package className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-600 font-medium">Available</p>
                                <p className="text-2xl font-bold text-gray-900">2,341</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-yellow-600 font-medium">Low Stock</p>
                                <p className="text-2xl font-bold text-gray-900">89</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-600 font-medium">Out of Stock</p>
                                <p className="text-2xl font-bold text-gray-900">23</p>
                            </div>
                            <XCircle className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                </div>

                {/* Product Categories Filter */}
                <div className="mb-6">
                    <div className="flex overflow-x-auto pb-2 space-x-2">
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg whitespace-nowrap font-medium">
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

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[
                        {
                            name: 'Premium Surgical Scissors',
                            category: 'Surgical Instruments',
                            price: '$129.99',
                            stock: 245,
                            image: '✂️'
                        },
                        {
                            name: 'Digital Blood Pressure Monitor',
                            category: 'Monitoring Equipment',
                            price: '$349.99',
                            stock: 128,
                            image: '🩺'
                        },
                        {
                            name: 'Disposable Syringes (Box)',
                            category: 'Consumables',
                            price: '$24.99',
                            stock: 456,
                            image: '💉'
                        },
                        {
                            name: 'Advanced Stethoscope',
                            category: 'Diagnostic Tools',
                            price: '$189.99',
                            stock: 53,
                            image: '🩺'
                        },
                        {
                            name: 'Surgical Mask (Pack of 50)',
                            category: 'Protective Equipment',
                            price: '$19.99',
                            stock: 789,
                            image: '😷'
                        },
                        {
                            name: 'ECG Machine Portable',
                            category: 'Monitoring Equipment',
                            price: '$1,299.99',
                            stock: 12,
                            image: '📈'
                        }
                    ].map((product, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="text-center mb-4">
                                <div className="text-4xl mb-2">{product.image}</div>
                                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                                <p className="text-lg font-bold text-blue-600">{product.price}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Stock:</span>
                                    <span className={`font-medium ${product.stock > 100 ? 'text-green-600' : product.stock > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {product.stock} units
                                    </span>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                                    Add to Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing 6 of 156 products
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
export default Products;