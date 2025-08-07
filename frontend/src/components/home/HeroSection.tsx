import Link from 'next/link';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32 hero-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    {/* Content */}
                    <div className="lg:col-span-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Advanced
                            <span className="text-blue-600"> Surgical Solutions</span>
                        </h1>
                        <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                            Harmony Surgitech delivers precision-engineered medical instruments and equipment
                            to healthcare professionals worldwide. Excellence in every tool, precision in every procedure.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Explore Products
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                Learn More
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Shield className="h-8 w-8 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                                <div className="text-sm text-gray-600">Quality Assurance</div>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Award className="h-8 w-8 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900">25+</div>
                                <div className="text-sm text-gray-600">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Users className="h-8 w-8 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900">500+</div>
                                <div className="text-sm text-gray-600">Healthcare Partners</div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="mt-12 lg:mt-0 lg:col-span-6">
                        <div className="relative">
                            <div className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded-2xl p-8 shadow-2xl">
                                <div className="bg-white rounded-xl p-8 shadow-lg">
                                    <div className="space-y-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-4 bg-blue-200 rounded w-2/3"></div>
                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            <div className="h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Shield className="h-8 w-8 text-blue-600" />
                                            </div>
                                            <div className="h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Award className="h-8 w-8 text-blue-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-600 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400 rounded-full opacity-30"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
