# HarmonySurgiTech API Documentation

## Base URL
- **Development**: `http://localhost:3001`
- **Production**: `https://api.harmonytech.com`

## Authentication

All API requests require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Management
- **Access Token**: Valid for 15 minutes
- **Refresh Token**: Valid for 7 days
- **Auto-refresh**: Frontend automatically handles token refresh

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request parameters |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

## Error Response Format

```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": {
    "field": "validation error details"
  }
}
```

---

# Authentication Endpoints

## Admin Authentication

### POST `/auth/admin/login`

Authenticate admin users and receive access tokens.

**Request Body:**
```json
{
  "email": "admin@harmonytech.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "admin@harmonytech.com",
    "role": "admin"
  },
  "message": "Login successful"
}
```

**Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

### POST `/auth/admin/logout`

Logout admin user and invalidate tokens.

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

## Distributor Authentication

### POST `/auth/distributor/login`

Authenticate distributor users.

**Request Body:**
```json
{
  "email": "distributor@company.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "distributor@company.com",
    "role": "distributor",
    "companyName": "Medical Supply Co.",
    "ownerName": "John Doe"
  },
  "message": "Login successful"
}
```

### POST `/auth/distributor/register`

Register new distributor (pending approval).

**Request Body:**
```json
{
  "ownerName": "John Doe",
  "companyName": "Medical Supply Co.",
  "email": "john@medicalsupply.com",
  "phone": "+1234567890",
  "address": "123 Medical St, City, State 12345",
  "password": "securePassword123",
  "message": "We specialize in surgical instruments distribution"
}
```

**Response (201):**
```json
{
  "message": "Registration submitted successfully. Awaiting admin approval."
}
```

### GET `/auth/ping`

Refresh authentication tokens.

**Headers:**
```
Cookie: refreshToken=<refresh-token>
```

**Response (200):**
```json
{
  "message": "Token refreshed successfully"
}
```

---

# Product Management Endpoints

## Get Products

### GET `/admin/getProducts`

Retrieve all products with optional filtering.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `category` (optional): Filter by product category
- `search` (optional): Search in product name and description
- `page` (optional): Page number for pagination
- `limit` (optional): Number of products per page

**Example Request:**
```
GET /admin/getProducts?category=Surgical%20Instruments&page=1&limit=10
```

**Response (200):**
```json
{
  "products": [
    {
      "id": 1,
      "sku": "HST-001",
      "barcode": "1234567890123",
      "name": "Surgical Forceps Kit",
      "description": "Complete set of surgical forceps",
      "category": "Surgical Instruments",
      "brand": "MedTech",
      "color": "Silver",
      "listPrice": 89.99,
      "costPrice": 59.99,
      "stockQuantity": 100,
      "reservedQuantity": 5,
      "minOrderQuantity": 1,
      "maxOrderQuantity": 50,
      "weight": 0.5,
      "dimensions": {
        "length": 15,
        "width": 5,
        "height": 2,
        "unit": "cm"
      },
      "isActive": true,
      "isDiscontinued": false,
      "dateOfManufacture": "2024-01-15",
      "dateOfExpiry": "2029-01-15",
      "createdAt": "2024-01-20T10:00:00Z",
      "updatedAt": "2024-01-20T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

### GET `/products/getProducts`

Public endpoint to retrieve active products (no authentication required).

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search query
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200):**
```json
{
  "products": [
    {
      "id": 1,
      "sku": "HST-001",
      "name": "Surgical Forceps Kit",
      "description": "Complete set of surgical forceps",
      "category": "Surgical Instruments",
      "listPrice": 89.99,
      "stockQuantity": 100,
      "isActive": true
    }
  ]
}
```

## Create Product

### POST `/admin/addProduct`

Add a new product to the catalog.

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "sku": "HST-002",
  "barcode": "1234567890124",
  "name": "Digital Blood Pressure Monitor",
  "description": "Professional grade digital BP monitor with memory function",
  "category": "Monitoring Equipment",
  "brand": "HealthTech",
  "color": "White",
  "listPrice": 149.99,
  "costPrice": 89.99,
  "stockQuantity": 25,
  "minOrderQuantity": 1,
  "maxOrderQuantity": 10,
  "weight": 1.2,
  "dimensions": {
    "length": 20,
    "width": 15,
    "height": 10,
    "unit": "cm"
  },
  "dateOfManufacture": "2024-01-10",
  "dateOfExpiry": "2029-01-10"
}
```

**Response (201):**
```json
{
  "message": "Product added successfully",
  "product": {
    "id": 2,
    "sku": "HST-002",
    "name": "Digital Blood Pressure Monitor",
    "category": "Monitoring Equipment",
    "listPrice": 149.99,
    "createdAt": "2024-01-21T10:00:00Z"
  }
}
```

**Response (400):**
```json
{
  "error": "SKU, name, and listPrice are required fields"
}
```

## Update Product

### PUT `/admin/updateProduct/:id`

Update an existing product.

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Path Parameters:**
- `id`: Product ID

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "listPrice": 199.99,
  "stockQuantity": 75,
  "isActive": true
}
```

**Response (200):**
```json
{
  "message": "Product updated successfully",
  "product": {
    "id": 2,
    "name": "Updated Product Name",
    "listPrice": 199.99,
    "updatedAt": "2024-01-21T11:00:00Z"
  }
}
```

## Delete Product

### DELETE `/admin/deleteProduct/:id`

Delete a product from the catalog.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Path Parameters:**
- `id`: Product ID

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

**Response (404):**
```json
{
  "error": "Product not found"
}
```

---

# Order Management Endpoints

## Get Orders

### GET `/admin/getOrders`

Retrieve all orders (Admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `status` (optional): Filter by order status
- `distributorId` (optional): Filter by distributor
- `startDate` (optional): Filter orders from date (YYYY-MM-DD)
- `endDate` (optional): Filter orders to date (YYYY-MM-DD)

**Response (200):**
```json
{
  "orders": [
    {
      "id": "order_1234567890",
      "orderNumber": "ORD-2024-001",
      "distributorId": 1,
      "distributor": {
        "id": 1,
        "companyName": "Medical Supply Co.",
        "ownerName": "John Doe",
        "email": "john@medicalsupply.com",
        "phone": "+1234567890",
        "address": "123 Medical St, City, State 12345"
      },
      "status": "CONFIRMED",
      "subTotal": 450.00,
      "taxAmount": 36.00,
      "discountAmount": 0.00,
      "totalAmount": 486.00,
      "notes": "Rush order for surgery",
      "requestedDeliveryDate": "2024-02-01",
      "orderItems": [
        {
          "id": 1,
          "productId": 1,
          "product": {
            "name": "Surgical Forceps Kit",
            "sku": "HST-001"
          },
          "quantity": 5,
          "unitPrice": 89.99,
          "totalPrice": 449.95
        }
      ],
      "createdAt": "2024-01-21T10:00:00Z",
      "updatedAt": "2024-01-21T11:00:00Z"
    }
  ]
}
```

### GET `/distributor/getOrders`

Retrieve orders for the authenticated distributor.

**Headers:**
```
Authorization: Bearer <distributor-token>
```

**Response (200):**
```json
{
  "orders": [
    {
      "id": "order_1234567890",
      "orderNumber": "ORD-2024-001",
      "status": "CONFIRMED",
      "totalAmount": 486.00,
      "orderItems": [
        {
          "product": {
            "name": "Surgical Forceps Kit"
          },
          "quantity": 5,
          "unitPrice": 89.99
        }
      ],
      "createdAt": "2024-01-21T10:00:00Z"
    }
  ]
}
```

## Place Order

### POST `/distributor/placeOrder`

Place a new order.

**Headers:**
```
Authorization: Bearer <distributor-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 5,
      "unitPrice": 89.99
    },
    {
      "productId": 2,
      "quantity": 2,
      "unitPrice": 149.99
    }
  ],
  "notes": "Rush order for upcoming surgery",
  "requestedDeliveryDate": "2024-02-01"
}
```

**Response (201):**
```json
{
  "message": "Order placed successfully",
  "order": {
    "id": "order_1234567891",
    "orderNumber": "ORD-2024-002",
    "status": "DRAFT",
    "subTotal": 749.93,
    "totalAmount": 749.93,
    "createdAt": "2024-01-21T12:00:00Z"
  }
}
```

## Update Order

### PUT `/distributor/updateOrder/:id`

Update an existing order (only for DRAFT status).

**Headers:**
```
Authorization: Bearer <distributor-token>
Content-Type: application/json
```

**Path Parameters:**
- `id`: Order ID

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 3,
      "unitPrice": 89.99
    }
  ],
  "notes": "Updated quantity"
}
```

**Response (200):**
```json
{
  "message": "Order updated successfully",
  "order": {
    "id": "order_1234567891",
    "totalAmount": 269.97,
    "updatedAt": "2024-01-21T13:00:00Z"
  }
}
```

## Cancel Order

### POST `/distributor/cancelOrder/:id`

Cancel an order.

**Headers:**
```
Authorization: Bearer <distributor-token>
```

**Path Parameters:**
- `id`: Order ID

**Request Body:**
```json
{
  "reason": "No longer needed"
}
```

**Response (200):**
```json
{
  "message": "Order cancelled successfully"
}
```

---

# Distributor Management Endpoints

## Get Distributors

### GET `/admin/distributors`

Retrieve all approved distributors.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "distributors": [
    {
      "id": 1,
      "ownerName": "John Doe",
      "companyName": "Medical Supply Co.",
      "email": "john@medicalsupply.com",
      "phone": "+1234567890",
      "address": "123 Medical St, City, State 12345",
      "createdAt": "2024-01-15T10:00:00Z",
      "totalOrders": 25,
      "totalRevenue": 12500.00
    }
  ]
}
```

## Get Pending Registrations

### GET `/auth/pendingDistributors`

Retrieve pending distributor applications.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "pendingRegistrations": [
    {
      "id": 1,
      "ownerName": "Jane Smith",
      "companyName": "Healthcare Solutions LLC",
      "email": "jane@healthcaresolutions.com",
      "phone": "+1987654321",
      "address": "456 Health Ave, City, State 54321",
      "message": "We have 10 years experience in medical equipment",
      "createdAt": "2024-01-20T10:00:00Z"
    }
  ]
}
```

## Approve Distributor

### POST `/auth/verify`

Approve a pending distributor registration.

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "jane@healthcaresolutions.com"
}
```

**Response (200):**
```json
{
  "message": "Distributor approved successfully"
}
```

## Reject Distributor

### POST `/auth/rejectDistributor`

Reject a pending distributor registration.

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "jane@healthcaresolutions.com",
  "reason": "Insufficient documentation provided"
}
```

**Response (200):**
```json
{
  "message": "Distributor registration rejected"
}
```

---

# Dashboard Endpoints

## Admin Dashboard

### GET `/admin/dashboard`

Get admin dashboard statistics.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "stats": {
    "totalProducts": 156,
    "totalOrders": 89,
    "totalDistributors": 12,
    "totalRevenue": 45620.50,
    "pendingOrders": 5,
    "lowStockProducts": 8
  },
  "recentOrders": [
    {
      "id": "order_1234567890",
      "orderNumber": "ORD-2024-001",
      "distributorName": "Medical Supply Co.",
      "totalAmount": 486.00,
      "status": "CONFIRMED",
      "createdAt": "2024-01-21T10:00:00Z"
    }
  ],
  "topProducts": [
    {
      "id": 1,
      "name": "Surgical Forceps Kit",
      "totalSold": 45,
      "revenue": 4049.55
    }
  ]
}
```

## Distributor Dashboard

### GET `/distributor/dashboard`

Get distributor dashboard statistics.

**Headers:**
```
Authorization: Bearer <distributor-token>
```

**Response (200):**
```json
{
  "stats": {
    "totalOrders": 25,
    "totalSpent": 12500.00,
    "pendingOrders": 2,
    "completedOrders": 23
  },
  "recentOrders": [
    {
      "id": "order_1234567890",
      "orderNumber": "ORD-2024-001",
      "totalAmount": 486.00,
      "status": "CONFIRMED",
      "createdAt": "2024-01-21T10:00:00Z"
    }
  ]
}
```

---

# Error Handling

## Common Error Scenarios

### Authentication Errors

**401 Unauthorized:**
```json
{
  "error": "Access token required"
}
```

**403 Forbidden:**
```json
{
  "error": "Admin access required"
}
```

### Validation Errors

**400 Bad Request:**
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

### Resource Errors

**404 Not Found:**
```json
{
  "error": "Product not found"
}
```

**409 Conflict:**
```json
{
  "error": "SKU already exists"
}
```

---

# Rate Limiting

The API implements rate limiting to prevent abuse:

- **General endpoints**: 100 requests per minute
- **Authentication endpoints**: 10 requests per minute
- **Order placement**: 20 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1642784400
```

---

# Webhook Events

## Order Status Updates

When order status changes, a webhook can be sent to registered endpoints:

**Webhook Payload:**
```json
{
  "event": "order.status_changed",
  "data": {
    "orderId": "order_1234567890",
    "orderNumber": "ORD-2024-001",
    "oldStatus": "PENDING",
    "newStatus": "CONFIRMED",
    "timestamp": "2024-01-21T12:00:00Z"
  }
}
```

## Low Stock Alerts

When product stock falls below minimum threshold:

**Webhook Payload:**
```json
{
  "event": "product.low_stock",
  "data": {
    "productId": 1,
    "productName": "Surgical Forceps Kit",
    "currentStock": 5,
    "minThreshold": 10,
    "timestamp": "2024-01-21T12:00:00Z"
  }
}
```

---

# SDK Usage Examples

## JavaScript/TypeScript SDK

```typescript
import { HarmonySurgiTechAPI } from '@harmony/api-client';

const api = new HarmonySurgiTechAPI({
  baseUrl: 'https://api.harmonytech.com',
  apiKey: 'your-api-key'
});

// Login
const auth = await api.auth.login({
  email: 'admin@harmonytech.com',
  password: 'password'
});

// Get products
const products = await api.products.getAll({
  category: 'Surgical Instruments',
  page: 1,
  limit: 10
});

// Place order
const order = await api.orders.create({
  items: [
    { productId: 1, quantity: 5, unitPrice: 89.99 }
  ],
  notes: 'Rush order'
});
```

---

# Testing

## Postman Collection

Import our Postman collection for easy API testing:

```bash
curl -o harmony-api.postman_collection.json \
  https://api.harmonytech.com/docs/postman
```

## Authentication for Testing

### Get Admin Token
```bash
curl -X POST http://localhost:3001/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@harmonytech.com",
    "password": "admin123"
  }'
```

### Use Token in Requests
```bash
curl -X GET http://localhost:3001/admin/getProducts \
  -H "Authorization: Bearer <your-token>"
```

---

This API documentation provides comprehensive coverage of all endpoints, request/response formats, and usage examples for the HarmonySurgiTech platform.
