import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";
import { logActivity } from "../../utils/activityLogger";

export const getProductsController = async (req: Request, res: Response) => {
    try {
        const {
            search,
            category,
            brand,
            isActive = true,
            sortBy = 'name',
            sortOrder = 'asc'
        } = req.query;

        // Build where clause for filtering
        const whereClause: any = {
            isActive: isActive === 'true' || isActive === true,
            isDiscontinued: false
        };

        // Add search filter
        if (search) {
            whereClause.OR = [
                { name: { contains: search.toString(), mode: 'insensitive' } },
                { description: { contains: search.toString(), mode: 'insensitive' } },
                { sku: { contains: search.toString(), mode: 'insensitive' } },
                { barcode: { contains: search.toString(), mode: 'insensitive' } }
            ];
        }

        // Add category filter
        if (category) {
            whereClause.category = { contains: category.toString(), mode: 'insensitive' };
        }

        // Add brand filter
        if (brand) {
            whereClause.brand = { contains: brand.toString(), mode: 'insensitive' };
        }

        // Build order by clause
        const orderBy: any = {};
        if (sortBy && ['name', 'sku', 'category', 'brand', 'listPrice', 'createdAt'].includes(sortBy.toString())) {
            orderBy[sortBy.toString()] = sortOrder === 'desc' ? 'desc' : 'asc';
        } else {
            orderBy.name = 'asc';
        }

        // Fetch products with pagination
        const products = await prisma.product.findMany({
            where: whereClause,
            orderBy,
            select: {
                id: true,
                sku: true,
                barcode: true,
                name: true,
                description: true,
                category: true,
                brand: true,
                color: true,
                listPrice: true,
                stockQuantity: true,
                minOrderQuantity: true,
                maxOrderQuantity: true,
                weight: true,
                dimensions: true,
                isActive: true,
                isDiscontinued: true,
                dateOfManufacture: true,
                dateOfExpiry: true,
                createdAt: true,
                updatedAt: true
            }
        });

        // Log activity for products retrieval
        try {
            await logActivity({
                action: "Products Retrieved",
                details: {
                    searchQuery: search || null,
                    category: category || null,
                    brand: brand || null,
                    totalResults: products.length
                }
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        return res.status(StatusCode.SUCCESS).json({
            products: products
        });

    } catch (error: any) {
        console.error("Error fetching products:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            error: "Failed to fetch products"
        });
    }
};

export default getProductsController;
