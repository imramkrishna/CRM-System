import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-white layout-container">
            <Header />
            <main className="pt-24"> {/* Increased padding to prevent overlap */}
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
