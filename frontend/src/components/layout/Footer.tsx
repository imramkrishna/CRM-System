import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">Harmony Surgitech</h3>
                        <p className="text-gray-300 mb-4">
                            Leading provider of precision surgical instruments and medical equipment,
                            committed to advancing healthcare through innovative solutions.
                        </p>
                        <div className="space-y-2 text-gray-300">
                            <div className="flex items-center space-x-2">
                                <span>📞</span>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>✉️</span>
                                <span>info@harmonysurgitech.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>📍</span>
                                <span>123 Medical District, Healthcare City, HC 12345</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link href="/" className="hover:text-blue-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-blue-400 transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-blue-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/become-distributor" className="hover:text-blue-400 transition-colors">
                                    Become a Distributor
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Customer Support
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Technical Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Warranty Information
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2025 Harmony Surgitech. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-gray-400">
                        <Link href="#" className="hover:text-blue-400 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:text-blue-400 transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
