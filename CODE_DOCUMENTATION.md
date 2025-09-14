# Code Documentation Guidelines

## Backend Controllers Documentation

### Authentication Controllers

#### Admin Login Controller (`/controllers/auth/adminLogin.controller.ts`)

```typescript
/**
 * Admin Authentication Controller
 * 
 * Handles authentication for administrative users with enhanced security measures.
 * Implements JWT token-based authentication with refresh token rotation.
 * 
 * @module adminLoginController
 * @requires bcrypt - Password hashing and comparison
 * @requires jsonwebtoken - JWT token generation and verification
 * @requires express - HTTP request/response handling
 * @requires prisma - Database operations
 */

/**
 * Authenticates admin users and generates access/refresh tokens
 * 
 * Security Features:
 * - Password hashing with bcrypt (cost factor: 12)
 * - JWT access tokens (15-minute expiry)
 * - HTTP-only refresh tokens (7-day expiry)
 * - Rate limiting protection
 * - Session invalidation on logout
 * 
 * @param {Request} req - Express request object containing email and password
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with user data and authentication status
 * 
 * @example
 * POST /auth/admin/login
 * {
 *   "email": "admin@harmonytech.com",
 *   "password": "securePassword123"
 * }
 * 
 * @throws {400} Invalid input parameters
 * @throws {401} Invalid credentials
 * @throws {500} Database or server error
 */
const adminLoginController = async (req: Request, res: Response): Promise<Response | void> => {
    // Implementation details...
}
```

#### Distributor Registration Controller (`/controllers/auth/register.controller.ts`)

```typescript
/**
 * Distributor Registration Controller
 * 
 * Manages new distributor applications with admin approval workflow.
 * Implements pending registration system for quality control.
 * 
 * @module registerController
 * @requires bcrypt - Password security
 * @requires prisma - Database operations
 * @requires validator - Input validation
 */

/**
 * Registers new distributor applications for admin approval
 * 
 * Process Flow:
 * 1. Validates input data (email format, phone number, address)
 * 2. Checks for existing registrations or approved accounts
 * 3. Hashes password for security
 * 4. Stores application in pendingRegistration table
 * 5. Triggers admin notification (if configured)
 * 
 * @param {Request} req - Request containing registration data
 * @param {Response} res - Response object
 * @returns {Promise<Response>} Success/error response
 * 
 * @example
 * POST /auth/distributor/register
 * {
 *   "ownerName": "John Doe",
 *   "companyName": "Medical Supply Co.",
 *   "email": "john@medicalsupply.com",
 *   "phone": "+1234567890",
 *   "address": "123 Medical St, City, State 12345",
 *   "password": "securePassword123",
 *   "message": "We specialize in surgical instruments"
 * }
 * 
 * @validation
 * - email: Must be valid email format and unique
 * - phone: Must be valid phone number and unique
 * - password: Minimum 8 characters, mixed case, numbers
 * - companyName: Required, minimum 2 characters
 * - ownerName: Required, minimum 2 characters
 * - address: Required, minimum 10 characters
 */
const registerController = async (req: Request, res: Response): Promise<Response | void> => {
    // Implementation details...
}
```

### Product Management Controllers

#### Add Product Controller (`/controllers/admin/addProductController.ts`)

```typescript
/**
 * Product Management Controller - Add Product
 * 
 * Creates new products in the medical equipment catalog with comprehensive
 * validation and automatic barcode generation capabilities.
 * 
 * @module addProductController
 * @requires prisma - Database operations
 * @requires productUtils - Barcode generation utilities
 * @requires types - TypeScript interfaces
 */

/**
 * Adds a new medical product to the catalog
 * 
 * Features:
 * - Automatic barcode generation if not provided
 * - Comprehensive input validation
 * - Price and inventory validation
 * - Dimension and weight handling
 * - Category standardization
 * - Duplicate SKU prevention
 * 
 * @param {Request} req - Request containing product data
 * @param {Response} res - Response object
 * @returns {Promise<Response>} Created product data or error
 * 
 * @example
 * POST /admin/addProduct
 * {
 *   "sku": "HST-001",
 *   "name": "Surgical Forceps Kit",
 *   "description": "Complete set of surgical forceps",
 *   "category": "Surgical Instruments",
 *   "brand": "MedTech",
 *   "listPrice": 89.99,
 *   "costPrice": 59.99,
 *   "stockQuantity": 100,
 *   "dimensions": {
 *     "length": 15,
 *     "width": 5,
 *     "height": 2,
 *     "unit": "cm"
 *   }
 * }
 * 
 * @validation
 * - sku: Required, unique, alphanumeric with hyphens
 * - name: Required, minimum 3 characters
 * - listPrice: Required, positive number
 * - costPrice: Optional, must be positive if provided
 * - stockQuantity: Optional, non-negative integer
 * - category: Must match predefined categories
 * 
 * @businessRules
 * - SKU must be unique across all products
 * - Cost price cannot exceed list price
 * - Reserved quantity cannot exceed stock quantity
 * - Expiry date must be after manufacture date
 */
const addProductController = async (req: Request, res: Response): Promise<Response | void> => {
    // Implementation details...
}
```

#### Delete Product Controller (`/controllers/admin/deleteProductController.ts`)

```typescript
/**
 * Product Management Controller - Delete Product
 * 
 * Safely removes products from catalog with referential integrity checks.
 * Implements soft delete capabilities for products with order history.
 * 
 * @module deleteProductController
 * @requires prisma - Database operations with transaction support
 */

/**
 * Deletes a product from the catalog with safety checks
 * 
 * Safety Features:
 * - Checks for existing orders before deletion
 * - Prevents deletion of products in active orders
 * - Maintains referential integrity
 * - Audit trail preservation
 * 
 * @param {Request} req - Request with product ID parameter
 * @param {Response} res - Response object
 * @returns {Promise<Response>} Success confirmation or error
 * 
 * @example
 * DELETE /admin/deleteProduct/123
 * 
 * @param {string} req.params.id - Product ID to delete
 * 
 * @throws {400} Missing or invalid product ID
 * @throws {404} Product not found
 * @throws {409} Product has active orders (cannot delete)
 * @throws {500} Database error
 * 
 * @businessRules
 * - Cannot delete products with pending or confirmed orders
 * - Cannot delete products with non-zero reserved quantity
 * - Admin permissions required
 * - Deletion is irreversible (consider soft delete for audit)
 */
const deleteProductController = async (req: Request, res: Response): Promise<Response | void> => {
    // Implementation details...
}
```

### Order Management Controllers

#### Place Order Controller (`/controllers/distributor/placeOrder.ts`)

```typescript
/**
 * Order Management Controller - Place Order
 * 
 * Handles order creation with inventory validation, pricing calculation,
 * and business rule enforcement for distributor orders.
 * 
 * @module placeOrderController
 * @requires prisma - Database operations with transactions
 * @requires types - Order and product interfaces
 */

/**
 * Creates a new order with comprehensive validation and calculations
 * 
 * Process Flow:
 * 1. Validates distributor authentication
 * 2. Validates product availability and pricing
 * 3. Calculates order totals (subtotal, tax, discounts)
 * 4. Reserves inventory
 * 5. Creates order record with transaction safety
 * 6. Generates order number
 * 7. Sends confirmation (if configured)
 * 
 * @param {Request} req - Request containing order data
 * @param {Response} res - Response object
 * @returns {Promise<Response>} Created order data or error
 * 
 * @example
 * POST /distributor/placeOrder
 * {
 *   "items": [
 *     {
 *       "productId": 1,
 *       "quantity": 5,
 *       "unitPrice": 89.99
 *     }
 *   ],
 *   "notes": "Rush order for surgery",
 *   "requestedDeliveryDate": "2024-02-01"
 * }
 * 
 * @validation
 * - items: Required array, minimum 1 item
 * - productId: Must exist and be active
 * - quantity: Must be positive, within min/max limits
 * - unitPrice: Must match current product price
 * - requestedDeliveryDate: Must be future date
 * 
 * @businessRules
 * - Inventory is reserved upon order creation
 * - Order totals calculated with current tax rates
 * - Distributor credit limits enforced
 * - Minimum order quantities respected
 * - Product availability checked in real-time
 */
const placeOrderController = async (req: Request, res: Response): Promise<Response | void> => {
    // Implementation details...
}
```

## Frontend Components Documentation

### Product Management Components

#### Inventory Component (`/components/admin/inventory.tsx`)

```typescript
/**
 * Admin Inventory Management Component
 * 
 * Comprehensive product catalog management interface with CRUD operations,
 * advanced filtering, and bulk operations support.
 * 
 * @component Inventory
 * @requires React - Component framework
 * @requires useCommonToasts - Toast notification system
 * @requires api - Backend API integration
 */

/**
 * Main inventory management interface for administrators
 * 
 * Features:
 * - Product listing with pagination
 * - Advanced search and filtering
 * - Product CRUD operations (Create, Read, Update, Delete)
 * - Category-based organization
 * - Stock level monitoring
 * - Bulk operations support
 * - Professional modal interfaces
 * - Real-time inventory updates
 * - PDF export capabilities
 * 
 * @returns {JSX.Element} Inventory management interface
 * 
 * @example
 * <Inventory />
 * 
 * @hooks
 * - useState: Component state management
 * - useEffect: Data fetching and cleanup
 * - useCommonToasts: User feedback notifications
 * 
 * @state
 * - products: Array of product objects
 * - searchQuery: Current search filter
 * - isLoading: Loading state indicator
 * - selectedProduct: Currently selected product for operations
 * - modalStates: Various modal visibility states
 * 
 * @functions
 * - fetchProducts(): Retrieves products from API
 * - handleAddProduct(): Creates new product
 * - handleEditProduct(): Updates existing product
 * - handleDeleteProduct(): Removes product with confirmation
 * - handleSearch(): Filters products based on criteria
 */
const Inventory: React.FC = () => {
    // Component implementation...
}

/**
 * Add Product Modal Component
 * 
 * Professional form interface for creating new products with
 * comprehensive validation and user-friendly design.
 * 
 * @component AddProductModal
 * @param {AddProductModalProps} props - Component properties
 * 
 * @example
 * <AddProductModal
 *   isOpen={true}
 *   onClose={() => setModalOpen(false)}
 *   onSave={(product) => handleProductAdd(product)}
 *   onError={(action) => showError(action)}
 * />
 * 
 * @validation
 * - Real-time form validation
 * - Required field indicators
 * - Price format validation
 * - SKU uniqueness checking
 * - Category selection validation
 */
interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
    onError: (action: string) => void;
}
```

#### Orders Component (`/components/admin/orders.tsx`)

```typescript
/**
 * Order Management Component
 * 
 * Comprehensive order processing interface with status management,
 * distributor information, and PDF generation capabilities.
 * 
 * @component Orders
 * @requires jsPDF - PDF generation
 * @requires useCommonToasts - User notifications
 */

/**
 * Main order management interface for administrators
 * 
 * Features:
 * - Order listing with status filtering
 * - Distributor information display
 * - Order status management
 * - Item-level order details
 * - PDF invoice generation
 * - Order search and filtering
 * - Bulk order operations
 * - Real-time order updates
 * 
 * @returns {JSX.Element} Order management interface
 * 
 * @businessRules
 * - Orders can only be edited in DRAFT status
 * - Status changes follow defined workflow
 * - PDF invoices include company branding
 * - Distributor contact information always visible
 */
const Orders: React.FC = () => {
    // Component implementation...
}
```

### Authentication Components

#### AuthProvider Component (`/components/auth/AuthProvider.tsx`)

```typescript
/**
 * Authentication Provider Component
 * 
 * Global authentication state management with automatic token refresh
 * and role-based access control throughout the application.
 * 
 * @component AuthProvider
 * @requires Redux - State management
 * @requires api - Authentication API calls
 */

/**
 * Provides authentication context to the entire application
 * 
 * Features:
 * - Automatic token refresh
 * - Role-based access control
 * - Persistent login state
 * - Logout on token expiry
 * - Protected route handling
 * 
 * @param {AuthProviderProps} props - Provider properties
 * @returns {JSX.Element} Authentication context provider
 * 
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
interface AuthProviderProps {
    children: React.ReactNode;
}
```

## Utility Functions Documentation

### API Client (`/lib/api.ts`)

```typescript
/**
 * API Client Utility
 * 
 * Centralized HTTP client with automatic authentication, token refresh,
 * and error handling for all backend communications.
 * 
 * @module api
 * @requires axios - HTTP client library
 */

/**
 * Makes authenticated API requests with automatic token refresh
 * 
 * Features:
 * - Automatic JWT token inclusion
 * - Token refresh on 401 errors
 * - Request/response interceptors
 * - Error handling and retries
 * - CORS configuration
 * 
 * @param {any} config - Axios request configuration
 * @returns {Promise<any>} API response data
 * 
 * @example
 * const response = await apiRequest({
 *   method: 'GET',
 *   url: '/admin/products',
 *   headers: { 'Content-Type': 'application/json' }
 * });
 */
export const apiRequest = async (config: any) => {
    // Implementation details...
}

/**
 * HTTP convenience methods with authentication
 */
export const get = (url: string, config = {}) => apiRequest({ method: 'GET', url, ...config });
export const post = (url: string, data = {}, config = {}) => apiRequest({ method: 'POST', url, data, ...config });
export const put = (url: string, data = {}, config = {}) => apiRequest({ method: 'PUT', url, data, ...config });
export const del = (url: string, config = {}) => apiRequest({ method: 'DELETE', url, ...config });
```

### Toast Notification System (`/contexts/ToastContext.tsx`)

```typescript
/**
 * Toast Notification System
 * 
 * Global notification system providing user feedback for all application
 * actions with customizable styling and automatic dismissal.
 * 
 * @module ToastContext
 * @requires React - Context and hooks
 */

/**
 * Toast notification context provider
 * 
 * Features:
 * - Multiple notification types (success, error, warning, info)
 * - Automatic dismissal with progress indicator
 * - Manual dismissal capability
 * - Stack management for multiple toasts
 * - Smooth animations
 * - Professional styling
 * 
 * @param {ToastProviderProps} props - Provider properties
 * @returns {JSX.Element} Toast context provider
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    // Implementation details...
}

/**
 * Hook for using toast notifications
 * 
 * @returns {ToastContextValue} Toast management functions
 * 
 * @example
 * const { addToast } = useToast();
 * addToast('Product saved successfully!', 'success');
 */
export const useToast = () => {
    // Implementation details...
}
```

### Common Toast Messages (`/hooks/useCommonToasts.ts`)

```typescript
/**
 * Common Toast Messages Hook
 * 
 * Predefined toast messages for common application actions,
 * ensuring consistent user feedback across the platform.
 * 
 * @module useCommonToasts
 * @requires useToast - Toast notification context
 */

/**
 * Provides predefined toast messages for common actions
 * 
 * Categories:
 * - Authentication (login, logout, errors)
 * - Product management (add, edit, delete)
 * - Order management (place, update, cancel)
 * - Distributor management (approve, reject)
 * - File operations (upload, download)
 * - Generic messages (success, error, info)
 * 
 * @returns {CommonToastMethods} Object with toast methods
 * 
 * @example
 * const { showProductAdded, showLoginSuccess } = useCommonToasts();
 * showProductAdded('Surgical Forceps');
 * showLoginSuccess();
 */
export const useCommonToasts = () => {
    // Implementation details...
}
```

## Database Schema Documentation

### Product Model (`prisma/schema.prisma`)

```prisma
/**
 * Product Model
 * 
 * Represents medical equipment and surgical instruments in the catalog.
 * Designed for comprehensive product information management with
 * inventory tracking and business rule enforcement.
 * 
 * @model Product
 * @table products
 */

model Product {
  // Primary identifier
  id                Int      @id @default(autoincrement())
  
  // Business identifiers
  sku               String   @unique // Stock Keeping Unit - business identifier
  barcode           String?  @unique // Optional barcode for scanning
  
  // Product information
  name              String   // Product display name
  description       String?  // Detailed product description
  category          String?  // Product category for organization
  brand             String?  // Manufacturer or brand name
  color             String?  // Product color specification
  
  // Pricing (using Decimal for financial precision)
  listPrice         Decimal  @db.Decimal(10, 2) // Customer-facing price
  costPrice         Decimal? @db.Decimal(10, 2) // Internal cost (optional)
  
  // Inventory management
  stockQuantity     Int?     @default(0)         // Available inventory
  reservedQuantity  Int?     @default(0)         // Reserved for orders
  minOrderQuantity  Int?     @default(1)         // Minimum order quantity
  maxOrderQuantity  Int?                        // Maximum order quantity
  
  // Physical specifications
  weight            Decimal? @db.Decimal(8, 3)   // Product weight
  dimensions        Json?                        // Length, width, height, unit
  
  // Status management
  isActive          Boolean  @default(true)      // Available for sale
  isDiscontinued    Boolean  @default(false)     // Discontinued product
  
  // Lifecycle dates
  dateOfManufacture DateTime?                    // Manufacturing date
  dateOfExpiry      DateTime?                    // Expiration date
  
  // Audit trail
  createdAt         DateTime @default(now())     // Record creation
  updatedAt         DateTime @updatedAt          // Last modification
  
  // Relationships
  orderItems        OrderItem[]                  // Associated order items
  
  // Indexes for performance
  @@index([category])          // Category-based queries
  @@index([isActive])          // Active products filter
  @@index([stockQuantity])     // Inventory level queries
  @@index([sku])              // SKU-based lookups
}
```

### Order Model (`prisma/schema.prisma`)

```prisma
/**
 * Order Model
 * 
 * Represents customer orders with comprehensive tracking,
 * financial calculations, and workflow management.
 * 
 * @model Order
 * @table orders
 */

model Order {
  // Primary identifier
  id            String      @id @default(cuid()) // UUID for security
  
  // Business identifier
  orderNumber   String      @unique              // Human-readable order number
  
  // Relationship
  distributorId Int                              // Foreign key to distributor
  distributor   distributor @relation(fields: [distributorId], references: [id])
  
  // Order status workflow
  status        OrderStatus @default(DRAFT)     // Current order status
  
  // Financial calculations (Decimal for precision)
  subTotal       Decimal @db.Decimal(10, 2)    // Sum of line items
  taxAmount      Decimal @default(0) @db.Decimal(10, 2)  // Tax calculation
  discountAmount Decimal @default(0) @db.Decimal(10, 2)  // Applied discounts
  totalAmount    Decimal @db.Decimal(10, 2)    // Final order total
  
  // Order metadata
  notes                 String?                 // Customer notes
  internalNotes         String?                 // Admin-only notes
  requestedDeliveryDate DateTime?               // Requested delivery
  
  // Approval workflow
  approvedAt      DateTime?                     // Approval timestamp
  rejectedAt      DateTime?                     // Rejection timestamp
  rejectionReason String?                       // Rejection explanation
  
  // Audit trail
  createdAt DateTime @default(now())            // Order creation
  updatedAt DateTime @updatedAt                 // Last modification
  
  // Relationships
  orderItems   OrderItem[]                      // Order line items
  orderHistory OrderHistory[]                   // Status change history
  
  // Performance indexes
  @@index([distributorId, status])              // Distributor orders by status
  @@index([orderNumber])                        // Order number lookups
  @@index([createdAt])                         // Date-based queries
  @@index([status])                            // Status-based filtering
}

/**
 * Order Status Enumeration
 * 
 * Defines the order lifecycle workflow with clear status progression.
 */
enum OrderStatus {
  DRAFT       // Order being created/edited
  PENDING     // Submitted for review
  CONFIRMED   // Approved and confirmed
  PROCESSING  // Being prepared/fulfilled
  SHIPPED     // Dispatched to customer
  DELIVERED   // Successfully delivered
  CANCELLED   // Cancelled by customer/admin
  REJECTED    // Rejected by admin
}
```

## Security Implementation Documentation

### JWT Token Management (`/utils/generateToken.ts`)

```typescript
/**
 * JWT Token Management Utility
 * 
 * Secure token generation and validation with refresh token rotation
 * and role-based access control implementation.
 * 
 * @module generateToken
 * @requires jsonwebtoken - JWT operations
 * @requires crypto - Secure random generation
 */

/**
 * Generates access and refresh token pair for authenticated users
 * 
 * Security Features:
 * - Short-lived access tokens (15 minutes)
 * - Long-lived refresh tokens (7 days)
 * - Role-based claims
 * - Secure random token generation
 * - Token rotation on refresh
 * 
 * @param {User} user - User object with id, email, and role
 * @returns {TokenPair} Object containing access and refresh tokens
 * 
 * @example
 * const tokens = generateTokens({
 *   id: 1,
 *   email: 'admin@harmonytech.com',
 *   role: 'admin'
 * });
 */
interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

/**
 * Validates and refreshes JWT tokens
 * 
 * @param {string} refreshToken - Current refresh token
 * @returns {Promise<TokenPair>} New token pair or throws error
 * 
 * @throws {401} Invalid or expired refresh token
 * @throws {403} Token has been revoked
 */
const refreshTokens = async (refreshToken: string): Promise<TokenPair> => {
    // Implementation details...
}
```

### Password Security (`/utils/encryptPassword.ts` & `/utils/comparePassword.ts`)

```typescript
/**
 * Password Security Utilities
 * 
 * Secure password hashing and verification using bcrypt with
 * industry-standard security parameters.
 * 
 * @module passwordSecurity
 * @requires bcrypt - Password hashing library
 */

/**
 * Securely hashes passwords using bcrypt
 * 
 * Security Parameters:
 * - Salt rounds: 12 (balanced security/performance)
 * - Automatic salt generation
 * - Timing-safe operations
 * 
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 * 
 * @example
 * const hashedPassword = await encryptPassword('userPassword123');
 */
const encryptPassword = async (password: string): Promise<string> => {
    // Implementation details...
}

/**
 * Verifies password against stored hash
 * 
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Stored password hash
 * @returns {Promise<boolean>} True if password matches
 * 
 * @example
 * const isValid = await comparePassword('userInput', storedHash);
 */
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    // Implementation details...
}
```

## Error Handling Documentation

### Centralized Error Handling

```typescript
/**
 * Global Error Handler
 * 
 * Centralized error handling middleware for consistent error responses
 * and logging throughout the application.
 * 
 * @module errorHandler
 * @requires express - Error handling middleware
 * @requires logger - Application logging
 */

/**
 * Express error handling middleware
 * 
 * Features:
 * - Consistent error response format
 * - Error logging for debugging
 * - Security-aware error messages
 * - Development vs production error details
 * 
 * @param {Error} error - Error object
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    // Log error for debugging
    console.error('Application Error:', {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    
    // Send appropriate response
    res.status(500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : error.message
    });
}
```

This documentation provides comprehensive coverage of the codebase with:

1. **Detailed function documentation** with parameters, return values, and examples
2. **Business logic explanations** for complex operations
3. **Security considerations** for sensitive operations
4. **Database schema documentation** with relationships and indexes
5. **API endpoint documentation** with request/response formats
6. **Component architecture** with props and state management
7. **Error handling patterns** and best practices
8. **Performance considerations** and optimization notes

The documentation follows industry standards for technical documentation and provides both high-level architecture understanding and detailed implementation guidance.
