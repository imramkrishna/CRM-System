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
    ownerName: string;
    email: string;
    phone: string;
    companyName: string;
    address: string;
    message: string;
    password: string;
    status?: 'pending' | 'approved' | 'rejected';
    createdAt?: string;
    updatedAt?: string;
}
