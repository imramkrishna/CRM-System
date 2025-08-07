import { Product } from '@/types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Surgical Scalpel Set',
        description: 'High-precision surgical scalpels for various medical procedures',
        image: '/api/placeholder/300/300',
        category: 'Surgical Instruments',
        specifications: [
            'Stainless steel construction',
            'Sterile packaging',
            'Various blade sizes (10, 11, 15, 20)',
            'Ergonomic handle design'
        ],
        features: [
            'Superior sharpness',
            'Single-use safety',
            'Latex-free',
            'FDA approved'
        ],
        inStock: true
    },
    {
        id: '2',
        name: 'Digital Blood Pressure Monitor',
        description: 'Advanced digital blood pressure monitor with memory function',
        image: '/api/placeholder/300/300',
        category: 'Monitoring Equipment',
        specifications: [
            'LCD display',
            'Memory for 30 readings',
            'Automatic inflation',
            'Irregular heartbeat detection'
        ],
        features: [
            'WHO classification indicator',
            'Large easy-to-read display',
            'One-touch operation',
            'Portable design'
        ],
        inStock: true
    },
    {
        id: '3',
        name: 'Surgical Forceps Kit',
        description: 'Complete set of surgical forceps for medical procedures',
        image: '/api/placeholder/300/300',
        category: 'Surgical Instruments',
        specifications: [
            'Stainless steel 316L',
            'Autoclavable',
            'Various sizes and types',
            'Non-slip grip'
        ],
        features: [
            'Corrosion resistant',
            'Precise gripping',
            'Easy to clean',
            'Professional grade'
        ],
        inStock: true
    },
    {
        id: '4',
        name: 'Disposable Syringes',
        description: 'Sterile disposable syringes for safe medical injections',
        image: '/api/placeholder/300/300',
        category: 'Consumables',
        specifications: [
            'Various sizes (1ml, 3ml, 5ml, 10ml)',
            'Luer lock tip',
            'Sterile and pyrogen-free',
            'Single-use only'
        ],
        features: [
            'Clear barrel graduation',
            'Smooth plunger action',
            'Safety cap included',
            'FDA approved'
        ],
        inStock: true
    },
    {
        id: '5',
        name: 'ECG Machine',
        description: '12-lead ECG machine for cardiac monitoring and diagnosis',
        image: '/api/placeholder/300/300',
        category: 'Diagnostic Equipment',
        specifications: [
            '12-lead configuration',
            'High-resolution display',
            'Built-in printer',
            'Data storage capability'
        ],
        features: [
            'Real-time monitoring',
            'Automatic analysis',
            'Portable design',
            'User-friendly interface'
        ],
        inStock: true
    },
    {
        id: '6',
        name: 'Surgical Gloves',
        description: 'Premium latex-free surgical gloves for medical procedures',
        image: '/api/placeholder/300/300',
        category: 'Protective Equipment',
        specifications: [
            'Nitrile material',
            'Powder-free',
            'Textured fingertips',
            'Various sizes (XS-XL)'
        ],
        features: [
            'Superior tactile sensitivity',
            'Chemical resistance',
            'Tear resistance',
            'Allergenic-free'
        ],
        inStock: true
    }
];

export const categories = [
    'All Products',
    'Surgical Instruments',
    'Monitoring Equipment',
    'Diagnostic Equipment',
    'Consumables',
    'Protective Equipment'
];
