import { Shield, Award, Clock, Users, Microscope, Heart } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Quality Assurance',
        description: 'All products undergo rigorous testing and meet international medical standards including ISO 13485 and FDA certifications.'
    },
    {
        icon: Microscope,
        title: 'Precision Engineering',
        description: 'State-of-the-art manufacturing processes ensure every instrument meets the highest precision requirements.'
    },
    {
        icon: Clock,
        title: 'Fast Delivery',
        description: 'Quick turnaround times with global shipping to ensure you get your medical supplies when you need them.'
    },
    {
        icon: Users,
        title: 'Expert Support',
        description: 'Dedicated customer support team with medical industry expertise to assist with all your needs.'
    },
    {
        icon: Award,
        title: 'Industry Recognition',
        description: 'Trusted by leading hospitals and healthcare providers worldwide for our commitment to excellence.'
    },
    {
        icon: Heart,
        title: 'Patient Safety',
        description: 'Every product is designed with patient safety as the top priority, ensuring optimal healthcare outcomes.'
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-white features-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose Harmony Surgitech?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're committed to providing healthcare professionals with the finest surgical instruments
                        and medical equipment to deliver exceptional patient care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                                    <Icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
