# Med CRM - Advanced Surgical Solutions Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5.1.0-green?style=flat-square&logo=express)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-darkgreen?style=flat-square&logo=prisma)](https://www.prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

A comprehensive medical equipment distribution platform designed for healthcare professionals, distributors, and administrators. Med CRM provides a modern, scalable solution for managing surgical instruments, medical equipment procurement, and distributor networks.

## 🏥 Project Overview

Med CRM is a full-stack web application that serves as a digital marketplace and management system for surgical instruments and medical equipment. The platform connects healthcare institutions with verified distributors while providing robust administrative tools for inventory management, order processing, and business analytics.

### 🎯 Core Purpose

- **Healthcare Providers**: Browse and procure high-quality surgical instruments and medical equipment
- **Distributors**: Manage inventory, process orders, and grow their business through the platform
- **Administrators**: Oversee the entire ecosystem with comprehensive management tools

## ✨ Key Features

### 🛍️ Product Management
- **Comprehensive Catalog**: 14+ medical equipment categories including surgical instruments, monitoring equipment, diagnostic tools
- **Advanced Search & Filtering**: Multi-criteria product discovery
- **Detailed Product Information**: Specifications, features, pricing, and availability
- **Inventory Tracking**: Real-time stock levels and automated reorder alerts
- **PDF Generation**: Professional order invoices and product catalogs

### 👥 User Management
- **Multi-Role Authentication**: Separate portals for admins, distributors, and customers
- **JWT-based Security**: Secure token-based authentication with refresh token rotation
- **Role-Based Access Control**: Granular permissions for different user types
- **Distributor Application System**: Streamlined onboarding process for new distributors

### 📊 Business Intelligence
- **Admin Dashboard**: Comprehensive analytics and reporting
- **Order Management**: Complete order lifecycle tracking and management
- **Distributor Analytics**: Performance metrics and sales insights
- **Financial Reporting**: Revenue tracking and financial summaries

### 🎨 User Experience
- **Modern UI/UX**: Professional medical industry design
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Notifications**: Toast-based feedback system for user actions
- **Progressive Web App**: Fast loading and offline capabilities

## 🏗️ Architecture

### Frontend (Next.js)
```
├── 🎨 Components/
│   ├── Admin (Dashboard, Inventory, Orders)
│   ├── Auth (Login, Registration)
│   ├── Distributor (Portal, Order Management)
│   ├── Products (Catalog, Details)
│   └── UI (Reusable Components)
├── 📱 Pages/
│   ├── Home & About
│   ├── Product Catalog
│   ├── Authentication
│   └── Dashboards
├── 🔧 Services/
│   ├── API Integration
│   ├── State Management (Redux)
│   └── Authentication
└── 🎯 Utils/
    ├── Toast Notifications
    ├── PDF Generation
    └── Utility Functions
```

### Backend (Express.js)
```
├── 🛡️ Authentication/
│   ├── JWT Token Management
│   ├── Role-Based Access Control
│   └── Session Management
├── 📊 Controllers/
│   ├── Admin Management
│   ├── Product Operations
│   ├── Order Processing
│   └── Distributor Management
├── 🗄️ Database/
│   ├── Prisma ORM
│   ├── PostgreSQL
│   └── Data Models
└── 🔧 Middleware/
    ├── Authentication
    ├── Authorization
    └── Validation
```

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.4.6 | React framework with App Router |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Redux Toolkit** | 2.8.2 | State management |
| **Lucide React** | 0.537.0 | Modern icon library |
| **jsPDF** | 3.0.2 | PDF generation |
| **Axios** | 1.11.0 | HTTP client |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Express.js** | 5.1.0 | Web application framework |
| **TypeScript** | 5.x | Type-safe server development |
| **Prisma** | 6.13.0 | Database ORM |
| **PostgreSQL** | Latest | Primary database |
| **JWT** | 9.0.2 | Authentication tokens |
| **bcrypt** | 6.0.0 | Password hashing |

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Prettier** - Code formatting
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/imramkrishna/Med CRM.git
cd Med CRM
```

2. **Backend Setup**
```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Configure your database URL in .env
DATABASE_URL="postgresql://username:password@localhost:5432/harmonydb"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"

# Setup database
npx prisma generate
npx prisma db push

# Start backend server
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Copy environment variables
cp .env.example .env.local

# Configure API URL
NEXT_PUBLIC_BACKEND_URL="http://localhost:3001"

# Start frontend development server
npm run dev
```

4. **Access the application**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)

## 📖 Usage Examples

### Product Management

```typescript
// Add a new product (Admin only)
const productData = {
  sku: "HST-001",
  name: "Surgical Forceps",
  description: "High-quality stainless steel forceps",
  category: "Surgical Instruments",
  listPrice: 89.99,
  stockQuantity: 100
};

const response = await api.post('/admin/addProduct', productData);
```

### Order Processing

```typescript
// Place an order (Distributor)
const orderData = {
  items: [
    { productId: 1, quantity: 5, unitPrice: 89.99 },
    { productId: 2, quantity: 2, unitPrice: 149.99 }
  ],
  notes: "Urgent delivery required"
};

const order = await api.post('/distributor/placeOrder', orderData);
```

### Authentication

```typescript
// Admin login
const loginData = {
  email: "admin@harmonytech.com",
  password: "securePassword"
};

const response = await api.post('/auth/admin/login', loginData);
```

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/harmonydb"

# JWT Secrets
JWT_SECRET="your-jwt-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"

# Server Configuration
PORT=3001
NODE_ENV="development"

# CORS Settings
FRONTEND_URL="http://localhost:3000"
```

#### Frontend (.env.local)
```env
# API Configuration
NEXT_PUBLIC_BACKEND_URL="http://localhost:3001"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="your-google-analytics-id"
```

### Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **admin** - Administrative users
- **distributor** - Distributor accounts
- **Product** - Medical equipment catalog
- **Order** - Order management
- **OrderItem** - Individual order line items
- **pendingRegistration** - Distributor applications

## 📚 API Documentation

### Authentication Endpoints

#### POST `/auth/admin/login`
Authenticate admin users.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  },
  "accessToken": "jwt-token"
}
```

#### POST `/auth/distributor/login`
Authenticate distributor users.

**Request Body:**
```json
{
  "email": "distributor@example.com",
  "password": "password123"
}
```

### Product Management Endpoints

#### GET `/admin/getProducts`
Retrieve all products (Admin only).

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "sku": "HST-001",
      "name": "Surgical Forceps",
      "category": "Surgical Instruments",
      "listPrice": 89.99,
      "stockQuantity": 100,
      "isActive": true
    }
  ]
}
```

#### POST `/admin/addProduct`
Add a new product (Admin only).

**Request Body:**
```json
{
  "sku": "HST-002",
  "name": "Digital Blood Pressure Monitor",
  "description": "Professional grade BP monitor",
  "category": "Monitoring Equipment",
  "brand": "MedTech",
  "listPrice": 149.99,
  "costPrice": 89.99,
  "stockQuantity": 50,
  "dimensions": {
    "length": 15,
    "width": 10,
    "height": 8,
    "unit": "cm"
  }
}
```

#### PUT `/admin/updateProduct/:id`
Update an existing product (Admin only).

#### DELETE `/admin/deleteProduct/:id`
Delete a product (Admin only).

### Order Management Endpoints

#### GET `/admin/getOrders`
Retrieve all orders (Admin only).

#### POST `/distributor/placeOrder`
Place a new order (Distributor only).

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 5,
      "unitPrice": 89.99
    }
  ],
  "notes": "Rush order for surgery",
  "requestedDeliveryDate": "2024-01-15"
}
```

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

### Test Categories

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Complete user workflow testing

## 🚀 Deployment

### Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

### Docker Deployment

```bash
# Build containers
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Environment-Specific Deployments

#### Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
cd frontend
vercel --prod
```

#### Railway/Heroku (Backend)
```bash
# Deploy backend to Railway
railway login
railway deploy
```

## 🤝 Contributing

We welcome contributions from the medical technology community!

### Development Workflow

1. **Fork the repository**
```bash
git clone https://github.com/yourusername/Med CRM.git
```

2. **Create a feature branch**
```bash
git checkout -b feature/new-medical-feature
```

3. **Make changes and commit**
```bash
git add .
git commit -m "Add new medical equipment category"
```

4. **Push and create PR**
```bash
git push origin feature/new-medical-feature
```

### Code Standards

- **TypeScript**: All code must be type-safe
- **ESLint**: Follow established linting rules
- **Comments**: Document complex medical algorithms
- **Testing**: Include tests for new features
- **Security**: Follow HIPAA compliance guidelines where applicable

### Areas for Contribution

- 🏥 **Medical Equipment Categories**: Add new product types
- 🔍 **Search Enhancement**: Improve product discovery
- 📊 **Analytics**: Enhanced reporting features
- 🌐 **Internationalization**: Multi-language support
- 📱 **Mobile App**: React Native companion app
- 🔒 **Security**: Enhanced security features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Med CRM

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👥 Team & Contact

### Development Team
- **Lead Developer**: [Ram Krishna](https://github.com/imramkrishna)
- **Project Maintainer**: [Ram Krishna](https://github.com/imramkrishna)

### Contact Information
- **Email**: contact@harmonytech.com
- **GitHub**: [Med CRM Repository](https://github.com/imramkrishna/Med CRM)
- **Issues**: [Report Issues](https://github.com/imramkrishna/Med CRM/issues)

### Support
For technical support or questions:
1. Check the [FAQ section](#faq)
2. Search existing [GitHub Issues](https://github.com/imramkrishna/Med CRM/issues)
3. Create a new issue with detailed information
4. For urgent matters, contact: support@harmonytech.com

## 🔄 Changelog

### Version 1.0.0 (Current)
- ✅ Initial release with core functionality
- ✅ Product catalog and management
- ✅ User authentication and authorization
- ✅ Order management system
- ✅ Admin and distributor dashboards
- ✅ Responsive design
- ✅ PDF generation for orders
- ✅ Toast notification system

### Upcoming Features (v1.1.0)
- 🔄 Real-time notifications
- 🔄 Advanced analytics dashboard
- 🔄 Mobile application
- 🔄 Multi-language support
- 🔄 Enhanced security features

## 🆘 FAQ

**Q: How do I become a distributor?**
A: Visit the "Become a Distributor" page and fill out the application form. Admin approval is required.

**Q: How do I reset my password?**
A: Use the "Forgot Password" link on the login page to receive reset instructions.

**Q: Can I integrate this with existing ERP systems?**
A: Yes, the API is designed to be integration-friendly. Contact us for custom integration support.

**Q: Is this HIPAA compliant?**
A: The platform includes security best practices. For HIPAA compliance, additional configuration may be required.

---

<div align="center">

**Built with ❤️ for the medical community**

[![GitHub Stars](https://img.shields.io/github/stars/imramkrishna/Med CRM?style=social)](https://github.com/imramkrishna/Med CRM/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/imramkrishna/Med CRM?style=social)](https://github.com/imramkrishna/Med CRM/network/members)

</div>
