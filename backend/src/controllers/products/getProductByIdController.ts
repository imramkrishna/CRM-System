import { Request, Response } from 'express';
import prisma from '../../utils/prismaClient';
import { logActivity } from '../../utils/activityLogger';

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: "Product ID is required"
            });
        }

        const productId = parseInt(id);
        if (isNaN(productId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid product ID"
            });
        }

        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        // Log activity for product retrieval
        try {
            await logActivity({
                action: "Product Retrieved",
                details: {
                    productId: product.id,
                    sku: product.sku,
                    name: product.name
                }
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        return res.status(200).json({
            success: true,
            data: {
                product: product
            }
        });

    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};
