import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Product Image */}
            <div className="relative h-64 bg-gray-100 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-6xl text-blue-300">🏥</div>
                </div>
                {product.inStock && (
                    <div className="absolute top-3 right-3">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            In Stock
                        </span>
                    </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                        <Link
                            href={`/products/${product.id}`}
                            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <Eye className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
                <div className="mb-2">
                    <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    <Link href={`/products/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                                {feature}
                            </span>
                        ))}
                        {product.features.length > 2 && (
                            <span className="text-xs text-gray-500">
                                +{product.features.length - 2} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                    <Link
                        href={`/products/${product.id}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        View Details
                    </Link>
                    <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
