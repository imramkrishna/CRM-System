import { Request,Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";
import { logActivity } from "../../utils/activityLogger";

const deleteProductController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(StatusCode.BAD_REQUEST).json({ error: "Product ID is required" });
        }

        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: Number(id) }
        });

        if (!existingProduct) {
            return res.status(StatusCode.NOT_FOUND).json({ error: "Product not found" });
        }

        // Delete the product
        await prisma.product.delete({
            where: { id: Number(id) }
        });

        // Log activity
        await logActivity({
            action: "Deleted Product",
            details: {
                productId: existingProduct.id,
                sku: existingProduct.sku,
                name: existingProduct.name
            }
        });

        return res.status(StatusCode.SUCCESS).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
};

export default deleteProductController;