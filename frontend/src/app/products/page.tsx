'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products, categories } from '@/data/products';
import { Search, Filter, Grid, List, SlidersHorizontal, ArrowUpDown, X, Star } from 'lucide-react';

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('name');
    const [showFilters, setShowFilters] = useState(false);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'category':
                return a.category.localeCompare(b.category);
            case 'availability':
                return a.inStock === b.inStock ? 0 : a.inStock ? -1 : 1;
            default:
                return 0;
        }
    });

    return (
        <Layout>
            {/* Mobile-Friendly Hero Section with Light Blue-Gray */}
            <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-white/40"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-transparent"></div>

                {/* Floating Elements - Subtle */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-slate-200/30 rounded-full blur-2xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        {/* Main Title */}
                        <div className="mb-6 sm:mb-8">
                            <span className="inline-block px-4 py-2 bg-blue-600/10 backdrop-blur-sm text-blue-800 text-sm font-medium rounded-full mb-4 border border-blue-200/50">
                                🏥 Premium Medical Equipment
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">
                                Precision <span className="text-blue-600">Medical</span><br className="hidden sm:block" />
                                <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
                                    Instruments
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto mb-8 sm:mb-10 px-4 leading-relaxed">
                                Experience the future of healthcare with our cutting-edge surgical instruments and diagnostic equipment.
                                <span className="block mt-2 text-slate-500">Trusted by <span className="font-semibold text-blue-600">10,000+</span> medical professionals worldwide.</span>
                            </p>
                        </div>

                        {/* Stats & Features - Light Theme */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-blue-200/50 shadow-lg">
                                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">28+</div>
                                <div className="text-slate-600 text-sm sm:text-base">Premium Products</div>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-blue-200/50 shadow-lg">
                                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">ISO</div>
                                <div className="text-slate-600 text-sm sm:text-base">Certified Quality</div>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-blue-200/50 shadow-lg">
                                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">24h</div>
                                <div className="text-slate-600 text-sm sm:text-base">Fast Delivery</div>
                            </div>
                        </div>

                        {/* Feature Badges - Light Theme */}
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm">
                            <span className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200/50">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                FDA Approved
                            </span>
                            <span className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200/50">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                                Surgical Grade
                            </span>
                            <span className="flex items-center bg-purple-50 text-purple-700 px-4 py-2 rounded-full border border-purple-200/50">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                                Global Shipping
                            </span>
                        </div>

                        {/* Scroll Indicator - Light Theme */}
                        <div className="mt-12 sm:mt-16">
                            <div className="animate-bounce">
                                <div className="w-6 h-10 border-2 border-slate-400/40 rounded-full mx-auto flex justify-center">
                                    <div className="w-1 h-3 bg-slate-500/60 rounded-full mt-2"></div>
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs mt-2">Scroll to explore</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    {/* Responsive Filters & Controls */}
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 mb-6 sm:mb-8">
                        {/* Top Bar with Search and View Controls */}
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-4">
                                {/* Search Bar */}
                                <div className="flex-1 max-w-full lg:max-w-md">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                        {searchTerm && (
                                            <button
                                                onClick={() => setSearchTerm('')}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-between sm:justify-start space-x-2 sm:space-x-4">
                                    {/* Filter Toggle */}
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-sm rounded-lg border transition-all ${showFilters
                                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <SlidersHorizontal className="h-4 w-4" />
                                        <span className="hidden sm:inline">Filters</span>
                                    </button>

                                    {/* Sort Dropdown */}
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="pl-3 pr-6 sm:pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-700"
                                        >
                                            <option value="name">Name</option>
                                            <option value="category">Category</option>
                                            <option value="availability">Stock</option>
                                        </select>
                                        <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 pointer-events-none" />
                                    </div>

                                    {/* View Mode Toggle */}
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 transition-all ${viewMode === 'grid'
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Grid className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 transition-all ${viewMode === 'list'
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            <List className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Responsive Expandable Filters */}
                        {showFilters && (
                            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                        >
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Availability Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                                        <div className="space-y-2">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <span className="ml-2 text-sm text-gray-700">In Stock</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                                <span className="ml-2 text-sm text-gray-700">Out of Stock</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Quick Filters */}
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Quick Filters</label>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full cursor-pointer hover:bg-blue-200 transition-colors">
                                                FDA Approved
                                            </span>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full cursor-pointer hover:bg-green-200 transition-colors">
                                                Sterilized
                                            </span>
                                            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full cursor-pointer hover:bg-purple-200 transition-colors">
                                                Premium
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Responsive Results Summary */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                        <div>
                            <p className="text-sm sm:text-base text-gray-600">
                                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products found
                                {selectedCategory !== 'All Products' && (
                                    <span className="text-sm text-gray-500 ml-2 block sm:inline">
                                        in <span className="font-medium">{selectedCategory}</span>
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Responsive Category Quick Links */}
                        <div className="flex flex-wrap gap-2 sm:hidden">
                            {categories.slice(0, 3).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3 py-1 text-xs rounded-full transition-all ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {category.length > 15 ? category.substring(0, 12) + '...' : category}
                                </button>
                            ))}
                        </div>

                        <div className="hidden lg:flex space-x-2">
                            {categories.slice(0, 4).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 text-sm rounded-full transition-all ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Responsive Products Display */}
                    {filteredProducts.length > 0 ? (
                        <div className="space-y-6">
                            {/* Products Grid */}
                            <div className={`
                                ${viewMode === 'grid'
                                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8'
                                    : 'space-y-6'
                                }
                            `}>
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className={`
                                        ${viewMode === 'list' ? 'bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300' : ''}
                                    `}>
                                        {viewMode === 'grid' ? (
                                            <ProductCard product={product} />
                                        ) : (
                                            /* Enhanced List View Layout */
                                            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                                                <div className="relative">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-48 sm:w-32 sm:h-32 object-cover rounded-xl border border-gray-200 shadow-md"
                                                    />
                                                    <div className="absolute top-2 right-2">
                                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.inStock
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-red-500 text-white'
                                                            }`}>
                                                            {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
                                                        <div className="flex-1 sm:pr-4">
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                                                    {product.category}
                                                                </span>
                                                                <div className="flex items-center space-x-1">
                                                                    {[1, 2, 3, 4].map((star) => (
                                                                        <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
                                                                    ))}
                                                                    <span className="text-xs text-gray-500">(4.2)</span>
                                                                </div>
                                                            </div>
                                                            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                                                {product.name}
                                                            </h3>
                                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                                                                {product.description}
                                                            </p>
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                {product.features.slice(0, 3).map((feature, index) => (
                                                                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                                                        {feature}
                                                                    </span>
                                                                ))}
                                                                {product.features.length > 3 && (
                                                                    <span className="text-xs text-gray-500">
                                                                        +{product.features.length - 3} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col space-y-2 sm:w-32">
                                                            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm font-semibold shadow-lg">
                                                                VIEW DETAILS
                                                            </button>
                                                            <button
                                                                className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${product.inStock
                                                                    ? 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                                                                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                                                                    }`}
                                                                disabled={!product.inStock}
                                                            >
                                                                ADD TO CART
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Professional Pagination */}
                            {filteredProducts.length > 12 && (
                                <div className="mt-12 flex flex-col items-center space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                            Previous
                                        </button>
                                        <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">1</span>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                            2
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                            3
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                            Next
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Showing <span className="font-semibold">1-12</span> of <span className="font-semibold">{filteredProducts.length}</span> products
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Responsive Empty State */
                        <div className="text-center py-12 sm:py-16">
                            <div className="bg-gray-100 rounded-full w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4">
                                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                                No products found
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto px-4">
                                We couldn't find any products matching your search criteria.
                                Try adjusting your filters or search terms.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('All Products');
                                    }}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                    Clear All Filters
                                </button>
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                >
                                    Clear Search
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
