'use client';

import { use } from 'react';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/products';
import { Check, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = use(params);
    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <Layout>
                <div className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                        <Link href="/products" className="text-blue-600 hover:underline">
                            Back to Products
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link
                            href="/products"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Products
                        </Link>
                    </div>

                    <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                        {/* Product Image */}
                        <div className="mb-8 lg:mb-0">
                            <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                                <div className="text-8xl text-blue-300">🏥</div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="mb-4">
                                <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            <p className="text-lg text-gray-600 mb-6">
                                {product.description}
                            </p>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.inStock ? (
                                    <div className="flex items-center text-green-600">
                                        <Check className="h-5 w-5 mr-2" />
                                        <span>In Stock</span>
                                    </div>
                                ) : (
                                    <div className="text-red-600">
                                        <span>Out of Stock</span>
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Specifications */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                                <ul className="space-y-2">
                                    {product.specifications.map((spec, index) => (
                                        <li key={index} className="flex items-center">
                                            <Check className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-4">
                                <button
                                    disabled={!product.inStock}
                                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Request Quote
                                </button>
                                <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
