import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { ShoppingCart, Eye, Star, CheckCircle, Clock } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-500 transform hover:-translate-y-2 relative">
            {/* Premium Badge */}
            <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10">
                PREMIUM
            </div>

            {/* Product Image */}
            <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 backdrop-blur-sm border ${product.inStock
                        ? 'bg-emerald-500/90 text-white border-emerald-400'
                        : 'bg-red-500/90 text-white border-red-400'
                        } shadow-lg`}>
                        {product.inStock ? (
                            <>
                                <CheckCircle className="h-3 w-3" />
                                <span>IN STOCK</span>
                            </>
                        ) : (
                            <>
                                <Clock className="h-3 w-3" />
                                <span>OUT OF STOCK</span>
                            </>
                        )}
                    </span>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/50 shadow-md">
                        {product.category}
                    </span>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Link
                            href={`/products/${product.id}`}
                            className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all shadow-xl hover:shadow-2xl"
                        >
                            <Eye className="h-5 w-5" />
                        </Link>
                        <button
                            className={`p-3 rounded-full transition-all shadow-xl hover:shadow-2xl ${product.inStock
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                }`}
                            disabled={!product.inStock}
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
                {/* Rating & Title */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            <Link href={`/products/${product.id}`}>
                                {product.name}
                            </Link>
                        </h3>
                        {/* Star Rating */}
                        <div className="flex items-center space-x-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">(4.2)</span>
                        </div>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Key Features with Icons */}
                <div className="mb-5">
                    <div className="grid grid-cols-2 gap-2">
                        {product.features.slice(0, 2).map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-100"
                            >
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                    {product.features.length > 2 && (
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            +{product.features.length - 2} more features
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mb-4">
                    <Link
                        href={`/products/${product.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        VIEW DETAILS
                    </Link>
                    <button
                        className={`px-4 py-3 rounded-xl border-2 transition-all font-semibold ${product.inStock
                            ? 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                            } shadow-md hover:shadow-lg`}
                        disabled={!product.inStock}
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>

                {/* Product Meta */}
                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-600">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="font-medium">{product.specifications.length} Specs</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-600 font-semibold">FDA CERTIFIED</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-pulse"></div>
        </div>
    );
};

export default ProductCard;
