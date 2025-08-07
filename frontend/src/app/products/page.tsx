'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products, categories } from '@/data/products';
import { Search, Filter, Grid, List, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

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
            {/* Responsive Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 sm:py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Our <span className="text-blue-600">Products</span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
                            Discover our comprehensive range of precision surgical instruments and medical equipment
                            designed to meet the highest standards of healthcare excellence.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Premium Quality
                            </span>
                            <span className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                ISO Certified
                            </span>
                            <span className="flex items-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                Fast Delivery
                            </span>
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

                    {/* Responsive Products Display */}
                    {filteredProducts.length > 0 ? (
                        <div className={`
                            ${viewMode === 'grid'
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                                : 'space-y-4'
                            }
                        `}>
                            {filteredProducts.map((product) => (
                                <div key={product.id} className={`
                                    ${viewMode === 'list' ? 'bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow' : ''}
                                `}>
                                    {viewMode === 'grid' ? (
                                        <ProductCard product={product} />
                                    ) : (
                                        /* Responsive List View Layout */
                                        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-48 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-sm text-blue-600 font-medium mb-2">
                                                            {product.category}
                                                        </p>
                                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                            {product.description}
                                                        </p>
                                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                                            <span className={`px-2 py-1 text-xs rounded-full ${product.inStock
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                                }`}>
                                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {product.specifications.length} specs
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
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

                    {/* Responsive Load More */}
                    {filteredProducts.length > 12 && (
                        <div className="mt-8 sm:mt-12 text-center">
                            <button className="bg-white border border-gray-300 text-gray-700 px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base">
                                Load More Products
                            </button>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">
                                Showing first 12 of {filteredProducts.length} products
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
