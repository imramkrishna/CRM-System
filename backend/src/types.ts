export enum StatusCode {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    CONFLICT = 409
}

export interface User {
    id: number;
    email: string;
    role: "admin" | "distributor"
}

export interface ProductCreateRequest {
    sku: string;
    barcode?: string; // Optional - will be auto-generated if not provided
    name: string;
    description?: string;
    category?: string;
    brand?: string;
    color?: string;
    listPrice: number;
    costPrice?: number;
    stockQuantity?: number;
    reservedQuantity?: number;
    minOrderQuantity?: number;
    maxOrderQuantity?: number;
    weight?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
        unit: string;
    };
    isActive?: boolean;
    isDiscontinued?: boolean;
    dateOfManufacture?: string;
    dateOfExpiry?: string;
}