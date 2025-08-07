export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    specifications: string[];
    features: string[];
    inStock: boolean;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'distributor' | 'user';
    phone?: string;
    address?: string;
    companyName?: string;
}

export interface DistributorApplication {
    id: string;
    name: string;
    email: string;
    phone: string;
    companyName: string;
    address: string;
    experience: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
}
