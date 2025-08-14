import { Request, Response } from 'express';
import prisma from '../../utils/prismaClient';

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
