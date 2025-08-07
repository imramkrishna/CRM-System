import Layout from '@/components/layout/Layout';
import { Users, Award, Target, Heart } from 'lucide-react';

const values = [
    {
        icon: Heart,
        title: 'Patient-Centered Care',
        description: 'Everything we do is focused on improving patient outcomes and safety.'
    },
    {
        icon: Award,
        title: 'Excellence',
        description: 'We strive for the highest standards in product quality and customer service.'
    },
    {
        icon: Target,
        title: 'Innovation',
        description: 'Continuously advancing medical technology to meet evolving healthcare needs.'
    },
    {
        icon: Users,
        title: 'Partnership',
        description: 'Building lasting relationships with healthcare professionals worldwide.'
    }
];

const team = [
    {
        name: 'Dr. Sarah Johnson',
        role: 'Chief Executive Officer',
        description: 'Former cardiac surgeon with 20+ years in medical device innovation.'
    },
    {
        name: 'Michael Chen',
        role: 'Chief Technology Officer',
        description: 'Biomedical engineer specializing in surgical instrument design.'
    },
    {
        name: 'Dr. Robert Miller',
        role: 'Chief Medical Officer',
        description: 'Practicing surgeon and medical device safety expert.'
    },
    {
        name: 'Lisa Anderson',
        role: 'VP of Operations',
        description: 'Operations leader with expertise in medical manufacturing and quality assurance.'
    }
];

export default function AboutPage() {
    return (
        <Layout>
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            About Harmony Surgitech
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            For over 25 years, Harmony Surgitech has been at the forefront of surgical innovation,
                            providing healthcare professionals with the precision instruments they need to deliver
                            exceptional patient care.
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div className="bg-blue-50 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-700 leading-relaxed">
                                To advance healthcare by providing innovative, high-quality surgical instruments
                                and medical equipment that enable healthcare professionals to deliver the best
                                possible patient outcomes with confidence and precision.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-gray-700 leading-relaxed">
                                To be the global leader in surgical technology, setting new standards for quality,
                                innovation, and reliability in medical devices that transform healthcare delivery
                                and improve lives worldwide.
                            </p>
                        </div>
                    </div>

                    {/* Company Values */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                            <p className="text-lg text-gray-600">
                                The principles that guide everything we do
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div className="flex justify-center mb-4">
                                            <div className="bg-blue-100 p-3 rounded-lg">
                                                <Icon className="h-8 w-8 text-blue-600" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {value.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company Story */}
                    <div className="mb-20">
                        <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="prose prose-lg max-w-none text-gray-700">
                                <p className="mb-6">
                                    Founded in 1999 by a team of surgeons and engineers, Harmony Surgitech was born
                                    from a simple yet powerful vision: to create surgical instruments that would
                                    enhance precision, improve safety, and ultimately save lives.
                                </p>
                                <p className="mb-6">
                                    What started as a small company focused on basic surgical tools has evolved into
                                    a global leader in medical device innovation. Today, our products are trusted by
                                    healthcare professionals in over 50 countries, from small clinics to major
                                    medical centers.
                                </p>
                                <p>
                                    Our commitment to quality and innovation has never wavered. Every product we create
                                    undergoes rigorous testing and quality assurance processes, ensuring that healthcare
                                    professionals can rely on our instruments when it matters most.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Leadership Team */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
                            <p className="text-lg text-gray-600">
                                Meet the experts driving our mission forward
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                        <Users className="h-10 w-10 text-gray-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-blue-600 font-medium mb-2">
                                        {member.role}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {member.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="bg-blue-600 rounded-xl text-white p-8 lg:p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
                            <p className="text-blue-100">
                                Our impact on global healthcare
                            </p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold mb-2">25+</div>
                                <div className="text-blue-100">Years of Excellence</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">500+</div>
                                <div className="text-blue-100">Healthcare Partners</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">50+</div>
                                <div className="text-blue-100">Countries Served</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">1M+</div>
                                <div className="text-blue-100">Lives Impacted</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
