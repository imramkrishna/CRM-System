import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingCart, Eye, Star, CheckCircle, Clock } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
            {/* Product Image */}
            <div className="relative h-56 bg-gray-100 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-6xl text-blue-300">🏥</div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center space-x-1 ${product.inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {product.inStock ? (
                            <>
                                <CheckCircle className="h-3 w-3" />
                                <span>In Stock</span>
                            </>
                        ) : (
                            <>
                                <Clock className="h-3 w-3" />
                                <span>Out of Stock</span>
                            </>
                        )}
                    </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {product.category}
                    </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-3">
                        <Link
                            href={`/products/${product.id}`}
                            className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            <Eye className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                        <h3 className="text-lg font-semibold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            <Link href={`/products/${product.id}`}>
                                {product.name}
                            </Link>
                        </h3>
                    </div>
                    {/* Rating placeholder */}
                    <div className="flex items-center space-x-1 ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Key Features */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, index) => (
                            <span
                                key={index}
                                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                            >
                                {feature}
                            </span>
                        ))}
                        {product.features.length > 2 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                                +{product.features.length - 2} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <Link
                        href={`/products/${product.id}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        View Details
                    </Link>
                    <button
                        className={`px-4 py-2.5 rounded-lg border transition-colors ${product.inStock
                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        disabled={!product.inStock}
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </button>
                </div>

                {/* Product Meta */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{product.specifications.length} specifications</span>
                        <span className="flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>Certified</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
