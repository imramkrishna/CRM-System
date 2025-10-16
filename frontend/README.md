# Med CRM - Medical Equipment Website

A modern, responsive website for Med CRM, a leading provider of surgical instruments and medical equipment. Built with Next.js, TypeScript, Tailwind CSS, and Redux.

## 🚀 Features

### Frontend Features
- **Responsive Design**: Fully responsive website that works on all devices
- **Modern UI**: Clean, professional, and minimalistic design
- **Fixed Navigation**: Navbar stays fixed while scrolling
- **Product Catalog**: Comprehensive product listing with search and filtering
- **Authentication System**: Separate login portals for admin and distributors
- **Admin Dashboard**: Complete admin panel for managing products and distributors
- **Distributor Portal**: Dedicated dashboard for distributors
- **Application System**: Online form for potential distributors to apply

### Pages Included
1. **Home** (`/`) - Hero section with company overview and features
2. **Products** (`/products`) - Product catalog with search and category filtering
3. **Product Details** (`/products/[id]`) - Individual product pages with specifications
4. **About Us** (`/about`) - Company information, mission, vision, and team
5. **Admin Login** (`/auth/admin-login`) - Admin authentication
6. **Distributor Login** (`/auth/distributor-login`) - Distributor authentication
7. **Become a Distributor** (`/become-distributor`) - Application form for new distributors
8. **Admin Dashboard** (`/admin`) - Admin panel (requires admin login)
9. **Distributor Dashboard** (`/distributor`) - Distributor portal (requires distributor login)

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Icons**: Lucide React
- **Authentication**: Custom Redux-based auth system

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/imramkrishna/HarmonySurgiTech.git
cd HarmonySurgiTech/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

The website includes a mock authentication system with the following test credentials:

### Admin Login
- **URL**: `/auth/admin-login`
- **Email**: Any valid email
- **Password**: Any password
- **Redirects to**: `/admin` (Admin Dashboard)

### Distributor Login
- **URL**: `/auth/distributor-login`
- **Email**: Any valid email
- **Password**: Any password
- **Redirects to**: `/distributor` (Distributor Portal)

## 📱 Responsive Design

The website is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Design Features

- **Minimalistic UI**: Clean and professional design
- **Consistent Branding**: Blue color scheme (#2563eb)
- **Smooth Animations**: Hover effects and transitions
- **Professional Typography**: Inter font family
- **Accessibility**: Proper contrast ratios and keyboard navigation

Built with ❤️ for Med CRM

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
