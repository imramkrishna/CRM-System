'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About Us', href: '/about' },
    ];

    const authLinks = [
        { name: 'Admin Login', href: '/auth/admin-login' },
        { name: 'Distributor Login', href: '/auth/distributor-login' },
        { name: 'Become a Distributor', href: '/become-distributor' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 transition-all duration-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center h-16">{/* Ensure consistent height */}
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            Harmony Surgitech
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <>
                                {authLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={cn(
                                            "px-3 py-2 text-sm font-medium transition-colors duration-200",
                                            link.name === 'Become a Distributor'
                                                ? "bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                : "text-gray-700 hover:text-blue-600"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={user?.role === 'admin' ? '/admin' : '/distributor'}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                                >
                                    <User className="h-4 w-4" />
                                    <span>{user?.name}</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="border-t border-gray-100 pt-3 mt-3">
                                {!isAuthenticated ? (
                                    authLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={cn(
                                                "block px-3 py-2 text-base font-medium",
                                                link.name === 'Become a Distributor'
                                                    ? "bg-blue-600 text-white rounded-md mt-2"
                                                    : "text-gray-700 hover:text-blue-600"
                                            )}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))
                                ) : (
                                    <Link
                                        href={user?.role === 'admin' ? '/admin' : '/distributor'}
                                        className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {user?.name} Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
