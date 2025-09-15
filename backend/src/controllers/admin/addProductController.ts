import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode, ProductCreateRequest } from "../../types";
import { generateBarcode } from "../../utils/productUtils";
import { logActivity } from "../../utils/activityLogger";

const addProductController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const {
            sku,
            barcode,
            name,
            description,
            category,
            brand,
            color,
            listPrice,
            costPrice,
            stockQuantity,
            reservedQuantity,
            minOrderQuantity,
            maxOrderQuantity,
            weight,
            dimensions,
            isActive,
            isDiscontinued,
            dateOfManufacture,
            dateOfExpiry
        } = req.body as ProductCreateRequest;

        // Validate required fields (barcode can be auto-generated)
        if (!sku || !name || listPrice === undefined) {
            return res.status(StatusCode.BAD_REQUEST).json({
                error: "SKU, name, and listPrice are required fields"
            });
        }

        // Generate barcode if not provided
        const productBarcode = barcode || generateBarcode();

        // Validate price values
        if (listPrice < 0 || (costPrice !== undefined && costPrice < 0)) {
            return res.status(StatusCode.BAD_REQUEST).json({
                error: "Prices cannot be negative"
            });
        }

        // Validate inventory quantities
        if (stockQuantity !== undefined && stockQuantity < 0) {
            return res.status(StatusCode.BAD_REQUEST).json({
                error: "Stock quantity cannot be negative"
            });
        }

        if (minOrderQuantity !== undefined && minOrderQuantity < 1) {
            return res.status(StatusCode.BAD_REQUEST).json({
                error: "Minimum order quantity must be at least 1"
            });
        }

        if (maxOrderQuantity !== undefined && minOrderQuantity !== undefined && maxOrderQuantity < minOrderQuantity) {
            return res.status(StatusCode.BAD_REQUEST).json({
                error: "Maximum order quantity cannot be less than minimum order quantity"
            });
        }

        // Validate dates
        if (dateOfManufacture && dateOfExpiry && new Date(dateOfManufacture) > new Date(dateOfExpiry)) {
            return res.status(StatusCode.BAD_REQUEST).json({
                error: "Date of manufacture cannot be after date of expiry"
            });
        }

        // Validate dimensions format if provided
        if (dimensions && typeof dimensions === 'object') {
            const dim = dimensions as any;
            if (!dim.length || !dim.width || !dim.height || !dim.unit) {
                return res.status(StatusCode.BAD_REQUEST).json({
                    error: "Dimensions must include length, width, height, and unit"
                });
            }
        }

        // Create the product
        const product = await prisma.product.create({
            data: {
                sku,
                barcode: productBarcode,
                name,
                description,
                category,
                brand,
                color,
                listPrice: parseFloat(listPrice.toString()),
                costPrice: costPrice !== undefined ? parseFloat(costPrice.toString()) : undefined,
                stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity.toString()) : 0,
                reservedQuantity: reservedQuantity !== undefined ? parseInt(reservedQuantity.toString()) : 0,
                minOrderQuantity: minOrderQuantity !== undefined ? parseInt(minOrderQuantity.toString()) : 1,
                maxOrderQuantity: maxOrderQuantity !== undefined ? parseInt(maxOrderQuantity.toString()) : undefined,
                weight: weight !== undefined ? parseFloat(weight.toString()) : undefined,
                dimensions: dimensions || undefined,
                isActive: isActive !== undefined ? Boolean(isActive) : true,
                isDiscontinued: isDiscontinued !== undefined ? Boolean(isDiscontinued) : false,
                dateOfManufacture: dateOfManufacture ? new Date(dateOfManufacture) : undefined,
                dateOfExpiry: dateOfExpiry ? new Date(dateOfExpiry) : undefined
            }
        });

        // Log activity
        await logActivity({
            action: "Created Product",
            details: {
                productId: product.id,
                sku: product.sku,
                name: product.name
            }
        });

        return res.status(StatusCode.CREATED).json({
            message: "Product created successfully",
            product
        });

    } catch (error: any) {
        console.error("Error adding product:", error);

        // Handle specific Prisma errors
        if (error.code === 'P2002') {
            return res.status(StatusCode.BAD_REQUEST).json({
                error: "Product with this SKU or barcode already exists"
            });
        }

        if (error.code === 'P2000') {
            return res.status(StatusCode.BAD_REQUEST).json({
                error: "Value too long for database field"
            });
        }

        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            error: "Failed to add product"
        });
    }
};

export default addProductController;