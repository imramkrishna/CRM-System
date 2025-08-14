'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Layout from '@/components/layout/Layout';
import {
    Package,
    ArrowLeft,
    ShoppingCart,
    Calendar,
    FileText,
    Loader2,
    X,
    Plus,
    Minus,
    Eye,
    Truck,
    Shield,
    Award
} from 'lucide-react';
import { get, post } from '@/lib/api';
import Link from 'next/link';

interface Product {
    id: number;
    sku: string;
    barcode: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    color: string;
    listPrice: string;
    stockQuantity: number;
    minOrderQuantity: number;
    maxOrderQuantity: number | null;
    weight: string;
    dimensions: {
        unit: string;
        width: number;
        height: number;
        length: number;
    };
    isActive: boolean;
    isDiscontinued: boolean;
    dateOfManufacture: string | null;
    dateOfExpiry: string | null;
    createdAt: string;
    updatedAt: string;
}

interface OrderForm {
    orderNumber: string;
    notes: string;
    requestedDeliveryDate: string;
}

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = use(params);
    
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(1);
    const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
    const [showProductDetails, setShowProductDetails] = useState<boolean>(false);
    const [orderForm, setOrderForm] = useState<OrderForm>({
        orderNumber: '',
        notes: '',
        requestedDeliveryDate: ''
    });

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const response = await get(`/products/${id}`);
            setProduct(response.data.product);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openOrderModal = () => {
        if (!product) return;
        setOrderQuantity(product.minOrderQuantity);
        setOrderForm({
            orderNumber: `ORD-${Date.now()}`,
            notes: '',
            requestedDeliveryDate: ''
        });
        setShowOrderModal(true);
    };

    const calculateLineTotal = (quantity: number, unitPrice: number) => {
        return quantity * unitPrice;
    };

    const submitOrder = async () => {
        if (!product) return;

        setIsSubmittingOrder(true);
        try {
            const unitPrice = parseFloat(product.listPrice);
            const lineTotal = calculateLineTotal(orderQuantity, unitPrice);

            const orderData = {
                orderNumber: orderForm.orderNumber,
                items: [{
                    productId: product.id,
                    quantity: orderQuantity,
                    unitPrice: unitPrice,
                    listPrice: unitPrice,
                    discountPercent: 0,
                    discountAmount: 0,
                    lineTotal: lineTotal
                }],
                notes: orderForm.notes,
                requestedDeliveryDate: orderForm.requestedDeliveryDate || null
            };

            await post("/distributor/place-order", orderData, {
                withCredentials: true
            });

            alert("Order placed successfully!");
            setShowOrderModal(false);
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setIsSubmittingOrder(false);
        }
    };

    const getStockStatus = (stockQuantity: number) => {
        if (stockQuantity === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-50 border-red-200' };
        if (stockQuantity < 10) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
        if (stockQuantity < 50) return { text: 'Limited Stock', color: 'text-orange-600 bg-orange-50 border-orange-200' };
        return { text: 'In Stock', color: 'text-green-600 bg-green-50 border-green-200' };
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <span className="text-xl text-gray-600">Loading product details...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
                        <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                            Back to Products
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const stockStatus = getStockStatus(product.stockQuantity);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-4 sm:mb-8">
                        <Link
                            href="/products"
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors w-fit"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back to Products</span>
                        </Link>
                        <div className="flex items-center space-x-3">
                            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Product Details</h1>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-8">
                            {/* Product Image Placeholder */}
                            <div className="space-y-4 sm:space-y-6">
                                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <div className="text-center p-4">
                                        <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500 font-medium text-sm sm:text-base break-words">{product.name}</p>
                                        <p className="text-xs sm:text-sm text-gray-400">Product Image</p>
                                    </div>
                                </div>
                                
                                {/* Product Badges */}
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                                        {product.category}
                                    </span>
                                    <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium">
                                        {product.brand}
                                    </span>
                                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${stockStatus.color}`}>
                                        {stockStatus.text}
                                    </span>
                                </div>
                            </div>

                            {/* Product Information */}
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">{product.name}</h2>
                                            <p className="text-base sm:text-lg text-gray-600 break-words">{product.description}</p>
                                        </div>
                                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded shrink-0">
                                            SKU: {product.sku}
                                        </span>
                                    </div>
                                    
                                    <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 sm:mb-6">
                                        ${parseFloat(product.listPrice).toFixed(2)}
                                    </div>
                                </div>

                                {/* Product Specifications */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                        <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Stock Information</h4>
                                        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Available:</span>
                                                <span className="font-medium">{product.stockQuantity} units</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Min Order:</span>
                                                <span className="font-medium">{product.minOrderQuantity} units</span>
                                            </div>
                                            {product.maxOrderQuantity && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Max Order:</span>
                                                    <span className="font-medium">{product.maxOrderQuantity} units</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                        <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Physical Properties</h4>
                                        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Weight:</span>
                                                <span className="font-medium">{product.weight} kg</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Color:</span>
                                                <span className="font-medium">{product.color}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Dimensions:</span>
                                                <span className="font-medium text-xs">
                                                    {product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} {product.dimensions.unit}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
                                    <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Why Choose This Product?</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 shrink-0" />
                                            <span className="text-xs sm:text-sm font-medium text-gray-700">Quality Assured</span>
                                        </div>
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 shrink-0" />
                                            <span className="text-xs sm:text-sm font-medium text-gray-700">Fast Delivery</span>
                                        </div>
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 shrink-0" />
                                            <span className="text-xs sm:text-sm font-medium text-gray-700">Trusted Brand</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Button */}
                                <div className="pt-4 sm:pt-6">
                                    <button
                                        onClick={openOrderModal}
                                        disabled={product.stockQuantity === 0}
                                        className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-semibold transition-colors flex items-center justify-center space-x-2 sm:space-x-3 ${
                                            product.stockQuantity === 0
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                        }`}
                                    >
                                        <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                                        <span>{product.stockQuantity === 0 ? 'Out of Stock' : 'Place Order'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="border-t border-gray-100 p-4 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Product Details</h4>
                                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                        <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Barcode:</span>
                                            <span className="font-medium break-all">{product.barcode}</span>
                                        </div>
                                        <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Brand:</span>
                                            <span className="font-medium">{product.brand}</span>
                                        </div>
                                        <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Category:</span>
                                            <span className="font-medium">{product.category}</span>
                                        </div>
                                        <div className="flex justify-between py-1 sm:py-2">
                                            <span className="text-gray-600">Status:</span>
                                            <span className="font-medium">{product.isActive ? 'Active' : 'Inactive'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Dates</h4>
                                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                        <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Added:</span>
                                            <span className="font-medium">{new Date(product.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Updated:</span>
                                            <span className="font-medium">{new Date(product.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                        {product.dateOfManufacture && (
                                            <div className="flex justify-between py-1 sm:py-2 border-b border-gray-100">
                                                <span className="text-gray-600">Manufactured:</span>
                                                <span className="font-medium">{new Date(product.dateOfManufacture).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                        {product.dateOfExpiry && (
                                            <div className="flex justify-between py-1 sm:py-2">
                                                <span className="text-gray-600">Expires:</span>
                                                <span className="font-medium">{new Date(product.dateOfExpiry).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Modal */}
                {showOrderModal && product && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] overflow-y-auto">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 my-8">
                            <div className="p-4 sm:p-6">
                                {/* Modal Header */}
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Place Order</h3>
                                        <p className="text-gray-600 text-sm sm:text-base break-words">{product.name}</p>
                                    </div>
                                    <button
                                        onClick={() => setShowOrderModal(false)}
                                        className="text-gray-400 hover:text-gray-600 p-1"
                                    >
                                        <X className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </button>
                                </div>

                                {/* Product Summary */}
                                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                                        <div>
                                            <span className="text-gray-600">SKU:</span>
                                            <span className="ml-2 font-medium break-all">{product.sku}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Price:</span>
                                            <span className="ml-2 font-medium">${parseFloat(product.listPrice).toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Available:</span>
                                            <span className="ml-2 font-medium">{product.stockQuantity} units</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Min Order:</span>
                                            <span className="ml-2 font-medium">{product.minOrderQuantity} units</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Form */}
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Order Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Order Number
                                        </label>
                                        <input
                                            type="text"
                                            value={orderForm.orderNumber}
                                            onChange={(e) => setOrderForm(prev => ({ ...prev, orderNumber: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                            placeholder="Enter order number"
                                        />
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quantity
                                        </label>
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => setOrderQuantity(Math.max(product.minOrderQuantity, orderQuantity - 1))}
                                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <input
                                                type="number"
                                                value={orderQuantity}
                                                onChange={(e) => setOrderQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || product.minOrderQuantity))}
                                                min={product.minOrderQuantity}
                                                max={product.maxOrderQuantity || product.stockQuantity}
                                                className="w-20 sm:w-24 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setOrderQuantity(Math.min(product.maxOrderQuantity || product.stockQuantity, orderQuantity + 1))}
                                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                            <span className="text-xs sm:text-sm text-gray-600">
                                                (Min: {product.minOrderQuantity}, Max: {product.maxOrderQuantity || product.stockQuantity})
                                            </span>
                                        </div>
                                    </div>

                                    {/* Delivery Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Requested Delivery Date (Optional)
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <input
                                                type="date"
                                                value={orderForm.requestedDeliveryDate}
                                                onChange={(e) => setOrderForm(prev => ({ ...prev, requestedDeliveryDate: e.target.value }))}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                            />
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Order Notes (Optional)
                                        </label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                                            <textarea
                                                value={orderForm.notes}
                                                onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                                                rows={3}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                                placeholder="Any special instructions or notes..."
                                            />
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                                        <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Order Summary</h4>
                                        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Unit Price:</span>
                                                <span className="font-medium">${parseFloat(product.listPrice).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Quantity:</span>
                                                <span className="font-medium">{orderQuantity}</span>
                                            </div>
                                            <div className="border-t border-gray-200 pt-2">
                                                <div className="flex justify-between">
                                                    <span className="font-semibold text-gray-900">Total:</span>
                                                    <span className="font-bold text-blue-600 text-base sm:text-lg">
                                                        ${calculateLineTotal(orderQuantity, parseFloat(product.listPrice)).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                                        <button
                                            onClick={() => setShowOrderModal(false)}
                                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm sm:text-base"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={submitOrder}
                                            disabled={isSubmittingOrder || !orderForm.orderNumber.trim()}
                                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                                        >
                                            {isSubmittingOrder ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span>Placing Order...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="h-4 w-4" />
                                                    <span>Place Order</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
