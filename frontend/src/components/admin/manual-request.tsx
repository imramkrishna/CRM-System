import {
    FileText,
    Package,
    AlertTriangle,
    Plus,
    Trash2,
    Check,
    Clock,
    Loader2,
    Search
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { post, get } from '@/lib/api';
import { useCommonToasts } from '@/hooks/useCommonToasts';

interface Product {
    id: number;
    sku: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    listPrice: string;
    stockQuantity: number;
    minOrderQuantity: number;
    maxOrderQuantity: number | null;
    isActive: boolean;
}

interface Distributor {
    id: number;
    companyName: string;
    email: string;
    contactPerson: string;
}

interface OrderItem {
    productId: number;
    quantity: number;
    unitPrice: number;
    listPrice: number;
    discountPercent: number;
    discountAmount: number;
    lineTotal: number;
}

interface OrderFormData {
    distributorId: number | null;
    items: OrderItem[];
    notes: string;
    requestedDeliveryDate: string;
}

const ManualRequest = () => {
    const {
        showSuccess,
        showError,
        showWarning,
        showOrderPlaced,
        showOrderError,
        showNetworkError,
        showServerError
    } = useCommonToasts();

    const [searchQueries, setSearchQueries] = useState({
        manualRequest: ''
    });

    // Form state
    const [formData, setFormData] = useState<OrderFormData>({
        distributorId: null,
        items: [],
        notes: '',
        requestedDeliveryDate: ''
    });

    // Data state
    const [products, setProducts] = useState<Product[]>([]);
    const [distributors, setDistributors] = useState<Distributor[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        fetchProducts();
        fetchDistributors();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await get('/admin/getProducts', { withCredentials: true });
            
            // Debug: Log the response to understand its structure
            console.log('Products API Response:', response);
            
            // Use the correct response structure based on the actual API response
            let productsData = [];
            if (response.data && Array.isArray(response.data.products)) {
                // Correct structure: response.data.products
                productsData = response.data.products;
            } else if (response.data && response.data.data && Array.isArray(response.data.data.products)) {
                // Fallback: response.data.data.products
                productsData = response.data.data.products;
            } else if (Array.isArray(response.data)) {
                // Fallback: direct array
                productsData = response.data;
            }
            
             
            
            // Filter active products and set state
            const activeProducts = productsData.filter((p: Product) => p.isActive);
            console.log('Active products:', activeProducts);
            setProducts(activeProducts);
            
            if (activeProducts.length === 0) {
                showWarning('No active products found. Please add products to the inventory first.');
            } else {
                showSuccess(`${activeProducts.length} product${activeProducts.length !== 1 ? 's' : ''} loaded successfully`);
            }
            
        } catch (error: any) {
            console.error('Error fetching products:', error);
            setProducts([]); // Ensure products is always an array even on error
            
            if (error.response?.status === 401) {
                showError('Session expired. Please log in again.');
            } else if (error.response?.status >= 500) {
                showServerError();
            } else if (!error.response) {
                showNetworkError();
            } else {
                showError('Failed to load products. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchDistributors = async () => {
        try {
            const response = await get('/admin/distributors', { withCredentials: true });
            
            
            // Use the correct response structure based on customers.tsx
            let distributorsData = [];
            if (response.data && Array.isArray(response.data.distributors)) {
                distributorsData = response.data.distributors;
            } else if (Array.isArray(response.data)) {
                distributorsData = response.data;
            }
            
            console.log('Processed distributors data:', distributorsData);
            setDistributors(distributorsData);
            
            if (distributorsData.length === 0) {
                showWarning('No distributors found. Please add distributors first.');
            }
            
        } catch (error: any) {
            console.error('Error fetching distributors:', error);
            setDistributors([]); // Ensure distributors is always an array even on error
            
            if (error.response?.status === 401) {
                showError('Session expired. Please log in again.');
            } else if (error.response?.status >= 500) {
                showServerError();
            } else if (!error.response) {
                showNetworkError();
            } else {
                showError('Failed to load distributors. Please try again.');
            }
        }
    };

    const handleSearchChange = (section: string, value: string) => {
        setSearchQueries(prev => ({
            ...prev,
            [section]: value
        }));
    };

    const addOrderItem = () => {
        if (products.length === 0) {
            showWarning('No products available. Please wait for products to load.');
            return;
        }
        
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, {
                productId: 0,
                quantity: 1,
                unitPrice: 0,
                listPrice: 0,
                discountPercent: 0,
                discountAmount: 0,
                lineTotal: 0
            }]
        }));
        
        showSuccess('Product line added. Please select a product.');
    };

    const removeOrderItem = (index: number) => {
        const itemToRemove = formData.items[index];
        const product = Array.isArray(products) ? products.find(p => p.id === itemToRemove.productId) : null;
        
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
        
        showSuccess(`Product ${product?.name || 'item'} removed from order`);
    };

    const updateOrderItem = (index: number, field: keyof OrderItem, value: number) => {
        setFormData(prev => {
            const newItems = [...prev.items];
            const item = { ...newItems[index] };
            
            if (field === 'productId') {
                const product = Array.isArray(products) ? products.find(p => p.id === value) : null;
                if (product) {
                    item.productId = value;
                    item.unitPrice = parseFloat(product.listPrice);
                    item.listPrice = parseFloat(product.listPrice);
                    item.lineTotal = item.unitPrice * item.quantity - item.discountAmount;
                    
                    // Show success toast when product is selected
                    if (value > 0) {
                        showSuccess(`${product.name} added to order line`);
                    }
                }
            } else if (field === 'quantity') {
                item.quantity = value;
                item.lineTotal = item.unitPrice * value - item.discountAmount;
            } else if (field === 'unitPrice') {
                item.unitPrice = value;
                item.lineTotal = value * item.quantity - item.discountAmount;
            } else if (field === 'discountPercent') {
                item.discountPercent = value;
                const subtotal = item.unitPrice * item.quantity;
                item.discountAmount = (subtotal * value) / 100;
                item.lineTotal = subtotal - item.discountAmount;
            } else {
                item[field] = value;
            }
            
            newItems[index] = item;
            return {
                ...prev,
                items: newItems
            };
        });
    };

    const calculateTotal = () => {
        return formData.items.reduce((sum, item) => sum + item.lineTotal, 0);
    };

    const handleSubmitOrder = async () => {
        // Validation with toast notifications
        if (!formData.distributorId) {
            showWarning('Please select a distributor before submitting the order');
            return;
        }

        if (formData.items.length === 0) {
            showWarning('Please add at least one product to the order');
            return;
        }

        // Validate all items have products selected
        const invalidItems = formData.items.filter(item => !item.productId || item.quantity <= 0);
        if (invalidItems.length > 0) {
            showWarning('Please ensure all items have valid products and quantities greater than 0');
            return;
        }

        // Check for negative quantities or prices
        const negativeItems = formData.items.filter(item => item.quantity < 0 || item.unitPrice < 0);
        if (negativeItems.length > 0) {
            showError('Quantity and unit price cannot be negative');
            return;
        }

        try {
            setSubmitLoading(true);

            const orderData = {
                distributorId: formData.distributorId,
                items: formData.items,
                notes: formData.notes,
                requestedDeliveryDate: formData.requestedDeliveryDate || null
            };

            const response = await post('/admin/manual-order-request', orderData, {
                withCredentials: true
            });

            const distributor = distributors.find(d => d.id === formData.distributorId);
            const orderNumber = response.data?.order?.orderNumber;
            
            showOrderPlaced(orderNumber);
            showSuccess(`Manual order created successfully for ${distributor?.companyName || 'distributor'}`);
            
            // Reset form
            setFormData({
                distributorId: null,
                items: [],
                notes: '',
                requestedDeliveryDate: ''
            });

        } catch (error: any) {
            console.error('Error creating manual order:', error);
            
            if (error.response?.status === 400) {
                showOrderError('create');
                showError(error.response?.data?.error || 'Invalid order data. Please check your inputs.');
            } else if (error.response?.status === 401) {
                showError('Session expired. Please log in again.');
            } else if (error.response?.status === 403) {
                showError('You do not have permission to create manual orders.');
            } else if (error.response?.status >= 500) {
                showServerError();
            } else if (!error.response) {
                showNetworkError();
            } else {
                showOrderError('create');
            }
        } finally {
            setSubmitLoading(false);
        }
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
                                <select 
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.distributorId || ''}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        distributorId: e.target.value ? parseInt(e.target.value) : null
                                    }))}
                                    disabled={loading}
                                >
                                    <option value="">
                                        {loading ? 'Loading distributors...' : 'Select a distributor'}
                                    </option>
                                    {distributors.map(distributor => (
                                        <option key={distributor.id} value={distributor.id}>
                                            {distributor.companyName} - {distributor.email}
                                        </option>
                                    ))}
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
                                    value={formData.notes}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        notes: e.target.value
                                    }))}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Requested Delivery Date (Optional)
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.requestedDeliveryDate}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        requestedDeliveryDate: e.target.value
                                    }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Selection</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">Selected Products</h4>
                                <button 
                                    onClick={addOrderItem}
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Add Product</span>
                                </button>
                            </div>

                            {formData.items.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>No products added yet</p>
                                    <p className="text-sm">Click "Add Product" to start building the order</p>
                                </div>
                            ) : (
                                formData.items.map((item, index) => {
                                    const selectedProduct = Array.isArray(products) ? products.find(p => p.id === item.productId) : null;
                                    return (
                                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-1 space-y-3">
                                                    {/* Product Selection */}
                                                    <select 
                                                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={item.productId || ''}
                                                        onChange={(e) => updateOrderItem(index, 'productId', parseInt(e.target.value) || 0)}
                                                        disabled={loading}
                                                    >
                                                        <option value="">
                                                            {loading 
                                                                ? 'Loading products...' 
                                                                : `Select product (${Array.isArray(products) ? products.length : 0} available)`
                                                            }
                                                        </option>
                                                        {Array.isArray(products) && products.length > 0 ? products.map(product => (
                                                            <option key={product.id} value={product.id}>
                                                                {product.name} - ${product.listPrice} ({product.sku})
                                                            </option>
                                                        )) : (
                                                            !loading && (
                                                                <option disabled>No products available</option>
                                                            )
                                                        )}
                                                    </select>

                                                    {/* Quantity and Price Grid */}
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                        <div>
                                                            <label className="block text-xs text-gray-500 mb-1">Quantity</label>
                                                            <input
                                                                type="number"
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                placeholder="Qty"
                                                                min="1"
                                                                value={item.quantity || ''}
                                                                onChange={(e) => updateOrderItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-gray-500 mb-1">Unit Price</label>
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                placeholder="Price"
                                                                value={item.unitPrice || ''}
                                                                onChange={(e) => updateOrderItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-gray-500 mb-1">Discount %</label>
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                max="100"
                                                                min="0"
                                                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                placeholder="0"
                                                                value={item.discountPercent || ''}
                                                                onChange={(e) => updateOrderItem(index, 'discountPercent', parseFloat(e.target.value) || 0)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-gray-500 mb-1">Line Total</label>
                                                            <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 font-medium">
                                                                ${item.lineTotal.toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Product Info */}
                                                    {selectedProduct && (
                                                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                                            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
                                                            <p><strong>Category:</strong> {selectedProduct.category}</p>
                                                            <p><strong>Stock:</strong> {selectedProduct.stockQuantity} units</p>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <button 
                                                    onClick={() => removeOrderItem(index)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}

                            <div className="flex justify-end border-t pt-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Subtotal</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        ${calculateTotal().toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button 
                            onClick={() => {
                                const hasData = formData.distributorId || formData.items.length > 0 || formData.notes.trim();
                                
                                setFormData({
                                    distributorId: null,
                                    items: [],
                                    notes: '',
                                    requestedDeliveryDate: ''
                                });
                                
                                if (hasData) {
                                    showSuccess('Form cleared successfully');
                                }
                            }}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmitOrder}
                            disabled={submitLoading || !formData.distributorId || formData.items.length === 0}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {submitLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                            <span>{submitLoading ? 'Creating Order...' : 'Submit Request'}</span>
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