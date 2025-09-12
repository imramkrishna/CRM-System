import {
    Package,
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    TrendingUp,
    AlertTriangle,
    Box,
    Tag,
    X,
    Save,
    Loader2,
    MoreHorizontal,
    FileText,
    Barcode,
    Calendar,
    DollarSign,
    Palette,
    Building2,
    Weight,
    Ruler,
    Shield,
    ShoppingCart
} from 'lucide-react';
import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { get, put } from '@/lib/api';

interface EditModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedProduct: Product) => void;
}

interface ViewModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const ViewProductModal = ({ product, isOpen, onClose }: ViewModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-16 pb-8 px-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[calc(100vh-8rem)] flex flex-col pointer-events-auto border border-gray-200 animate-in slide-in-from-top-4 duration-300">
                <div className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Eye className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Product Details</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="group p-2 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-200"
                    >
                        <X className="h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 space-y-8">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                                        <Package className="h-4 w-4 text-white" />
                                    </div>
                                    Basic Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">ID</span>
                                        <div className="text-lg font-bold text-gray-900 mt-1">{product.id}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">SKU</span>
                                        <div className="text-lg font-bold text-gray-900 mt-1">{product.sku}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm col-span-2">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Barcode</span>
                                        <div className="text-lg font-mono text-gray-900 mt-1">{product.barcode}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm col-span-2">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Product Name</span>
                                        <div className="text-lg font-bold text-gray-900 mt-1">{product.name}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</span>
                                        <div className="text-sm font-medium text-blue-600 mt-1">{product.category}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Brand</span>
                                        <div className="text-sm font-medium text-indigo-600 mt-1">{product.brand}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Color</span>
                                        <div className="flex items-center mt-1">
                                            <div className="w-4 h-4 rounded-full mr-2 border border-gray-300" style={{backgroundColor: product.color.toLowerCase()}}></div>
                                            <span className="text-sm font-medium text-gray-900">{product.color}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                        <DollarSign className="h-4 w-4 text-white" />
                                    </div>
                                    Pricing & Stock
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">List Price</span>
                                        <div className="text-2xl font-bold text-green-600 mt-1">${product.listPrice}</div>
                                    </div>
                                    {product.costPrice && (
                                        <div className="bg-white rounded-lg p-4 shadow-sm">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Cost Price</span>
                                            <div className="text-xl font-bold text-gray-700 mt-1">${product.costPrice}</div>
                                        </div>
                                    )}
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Stock</span>
                                        <div className="text-xl font-bold text-gray-900 mt-1">{product.stockQuantity}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Reserved</span>
                                        <div className="text-xl font-bold text-orange-600 mt-1">{product.reservedQuantity}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm col-span-2">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Available Stock</span>
                                        <div className="text-2xl font-bold text-emerald-600 mt-1">
                                            {product.stockQuantity}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                        <ShoppingCart className="h-4 w-4 text-white" />
                                    </div>
                                    Order Limits
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Min Order</span>
                                        <div className="text-xl font-bold text-purple-600 mt-1">{product.minOrderQuantity}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Max Order</span>
                                        <div className="text-xl font-bold text-purple-600 mt-1">
                                            {product.maxOrderQuantity || '∞'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                                        <Ruler className="h-4 w-4 text-white" />
                                    </div>
                                    Physical Properties
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Weight</span>
                                        <div className="text-lg font-bold text-orange-600 mt-1">{product.weight}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dimensions</span>
                                        <div className="text-sm font-mono text-gray-900 mt-1">
                                            {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} {product.dimensions.unit}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center mr-3">
                                        <Calendar className="h-4 w-4 text-white" />
                                    </div>
                                    Status & Dates
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</span>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                                product.isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                                            }`}>
                                                {product.isActive ? '✓ Active' : '✗ Inactive'}
                                            </span>
                                            {product.isDiscontinued && (
                                                <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                                                    ⚠ Discontinued
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {product.dateOfManufacture && (
                                        <div className="bg-white rounded-lg p-4 shadow-sm">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Manufactured</span>
                                            <div className="text-sm font-medium text-gray-900 mt-1">
                                                {new Date(product.dateOfManufacture).toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    {product.dateOfExpiry && (
                                        <div className="bg-white rounded-lg p-4 shadow-sm">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Expires</span>
                                            <div className="text-sm font-medium text-red-600 mt-1">
                                                {new Date(product.dateOfExpiry).toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white rounded-lg p-4 shadow-sm">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Created</span>
                                            <div className="text-xs text-gray-600 mt-1">
                                                {new Date(product.createdAt).toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 shadow-sm">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Updated</span>
                                            <div className="text-xs text-gray-600 mt-1">
                                                {new Date(product.updatedAt).toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mr-3">
                                <FileText className="h-4 w-4 text-white" />
                            </div>
                            Product Description
                        </h3>
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{product.description}</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EditProductModal = ({ product, isOpen, onClose, onSave }: EditModalProps) => {
    const [editedProduct, setEditedProduct] = useState<Product>(product);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setEditedProduct(product);
    }, [product]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await put(`/admin/updateProduct/${product.id}`, editedProduct);
            onSave(editedProduct);
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-16 pb-8 px-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[calc(100vh-8rem)] flex flex-col pointer-events-auto border border-gray-200 animate-in slide-in-from-top-4 duration-300">
                <div className="flex-shrink-0 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Edit className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Edit Product</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="group p-2 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-200"
                    >
                        <X className="h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                                        <Package className="h-4 w-4 text-white" />
                                    </div>
                                    Basic Information
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={editedProduct.name}
                                            onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                                            placeholder="Enter product name"
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Category *
                                            </label>
                                            <input
                                                type="text"
                                                value={editedProduct.category}
                                                onChange={(e) => setEditedProduct({...editedProduct, category: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                                                placeholder="Product category"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Brand *
                                            </label>
                                            <input
                                                type="text"
                                                value={editedProduct.brand}
                                                onChange={(e) => setEditedProduct({...editedProduct, brand: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                                                placeholder="Brand name"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Color
                                        </label>
                                        <input
                                            type="text"
                                            value={editedProduct.color}
                                            onChange={(e) => setEditedProduct({...editedProduct, color: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                                            placeholder="Product color"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Pricing & Stock */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                        <DollarSign className="h-4 w-4 text-white" />
                                    </div>
                                    Pricing & Inventory
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            List Price *
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                                            <input
                                                type="text"
                                                value={editedProduct.listPrice}
                                                onChange={(e) => setEditedProduct({...editedProduct, listPrice: e.target.value})}
                                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Stock Quantity *
                                        </label>
                                        <input
                                            type="number"
                                            value={editedProduct.stockQuantity}
                                            onChange={(e) => setEditedProduct({...editedProduct, stockQuantity: parseInt(e.target.value)})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Min Order Qty *
                                            </label>
                                            <input
                                                type="number"
                                                value={editedProduct.minOrderQuantity}
                                                onChange={(e) => setEditedProduct({...editedProduct, minOrderQuantity: parseInt(e.target.value)})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
                                                placeholder="1"
                                                min="1"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Max Order Qty
                                            </label>
                                            <input
                                                type="number"
                                                value={editedProduct.maxOrderQuantity || ''}
                                                onChange={(e) => setEditedProduct({...editedProduct, maxOrderQuantity: e.target.value ? parseInt(e.target.value) : null})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
                                                placeholder="No limit"
                                                min="1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center mr-3">
                                <FileText className="h-4 w-4 text-white" />
                            </div>
                            Product Description
                        </h3>
                        <textarea
                            value={editedProduct.description}
                            onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 shadow-sm resize-none"
                            placeholder="Enter detailed product description..."
                        />
                    </div>
                    
                    {/* Physical Properties */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                                <Weight className="h-4 w-4 text-white" />
                            </div>
                            Physical Properties
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Weight
                            </label>
                            <input
                                type="text"
                                value={editedProduct.weight}
                                onChange={(e) => setEditedProduct({...editedProduct, weight: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm"
                                placeholder="e.g., 2.5 kg"
                            />
                        </div>
                    </div>
                    
                    {/* Status toggles */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="h-4 w-4 text-white" />
                            </div>
                            Product Status
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={editedProduct.isActive}
                                        onChange={(e) => setEditedProduct({...editedProduct, isActive: e.target.checked})}
                                        className="h-5 w-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <div className="ml-3">
                                        <label className="text-sm font-semibold text-gray-900">Active Product</label>
                                        <p className="text-xs text-gray-500">Product is available for sale</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={editedProduct.isDiscontinued}
                                        onChange={(e) => setEditedProduct({...editedProduct, isDiscontinued: e.target.checked})}
                                        className="h-5 w-5 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                                    />
                                    <div className="ml-3">
                                        <label className="text-sm font-semibold text-gray-900">Discontinued</label>
                                        <p className="text-xs text-gray-500">Product is no longer available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                
                <div className="flex-shrink-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-8 py-6 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Inventory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await get("/admin/getProducts", {
                withCredentials: true
            });
            setProducts(response.data.data.products);
            console.log('Fetched products:', response.data.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductUpdate = (updatedProduct: Product) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleViewProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsViewModalOpen(true);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const lowStockProducts = products.filter(p => p.stockQuantity - p.reservedQuantity < 10);
    const activeProducts = products.filter(p => p.isActive);
    const discontinuedProducts = products.filter(p => p.isDiscontinued);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-full text-gray-900 placeholder-gray-500"
                        />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

            {/* Product Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-600 font-medium">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-medium">Active Products</p>
                            <p className="text-2xl font-bold text-gray-900">{activeProducts.length}</p>
                        </div>
                        <Shield className="h-8 w-8 text-green-500" />
                    </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-yellow-600 font-medium">Low Stock</p>
                            <p className="text-2xl font-bold text-gray-900">{lowStockProducts.length}</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-600 font-medium">Discontinued</p>
                            <p className="text-2xl font-bold text-gray-900">{discontinuedProducts.length}</p>
                        </div>
                        <Box className="h-8 w-8 text-red-500" />
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading products...</span>
                </div>
            ) : (
                <>
                    {/* Product List */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product Details
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category & Brand
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pricing
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
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
                                {paginatedProducts.map((product) => {
                                    const availableStock = product.stockQuantity - product.reservedQuantity;
                                    const isLowStock = availableStock < 10;
                                    
                                    return (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                                            <Package className="h-5 w-5 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.category}</div>
                                                <div className="text-sm text-gray-500">{product.brand}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">${product.listPrice}</div>
                                                {product.costPrice && (
                                                    <div className="text-sm text-gray-500">Cost: ${product.costPrice}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    Available: {availableStock}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Total: {product.stockQuantity} | Reserved: {product.reservedQuantity}
                                                </div>
                                                {isLowStock && (
                                                    <div className="flex items-center mt-1">
                                                        <AlertTriangle className="h-3 w-3 text-yellow-500 mr-1" />
                                                        <span className="text-xs text-yellow-600">Low Stock</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col space-y-1">
                                                    <span className={`px-2 py-1 text-xs rounded-full w-fit ${
                                                        product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {product.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                    {product.isDiscontinued && (
                                                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 w-fit">
                                                            Discontinued
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleViewProduct(product)}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                        title="View Details"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditProduct(product)}
                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                                                        title="Edit Product"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        
                        {filteredProducts.length === 0 && !isLoading && (
                            <div className="text-center py-12">
                                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500">
                                    {searchQuery ? 'Try adjusting your search criteria.' : 'Start by adding your first product.'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-1 rounded-md ${
                                                page === currentPage
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Modals */}
            {selectedProduct && (
                <>
                    <EditProductModal
                        product={selectedProduct}
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedProduct(null);
                        }}
                        onSave={handleProductUpdate}
                    />
                    <ViewProductModal
                        product={selectedProduct}
                        isOpen={isViewModalOpen}
                        onClose={() => {
                            setIsViewModalOpen(false);
                            setSelectedProduct(null);
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default Inventory;