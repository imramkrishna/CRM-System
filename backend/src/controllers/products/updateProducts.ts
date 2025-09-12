import { Request,Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";

const updateProductsController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const {
            id,
            sku,
            barcode,
            name,
            description,
            category,
            brand,
            listPrice,
            costPrice,
            stockQuantity,
            isActive
        } = req.body;

        // Validate required fields
        if (!id || !name || !listPrice || stockQuantity === undefined) {
            return res.status(StatusCode.BAD_REQUEST).json({ error: "Missing required product fields" });
        }

        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: id.toString() }
        });

        if (!existingProduct) {
            return res.status(StatusCode.NOT_FOUND).json({ error: "Product not found" });
        }

        // Update the product
        const updatedProduct = await prisma.product.update({
            where: { id: id.toString() },
            data: {
                sku,
                barcode,
                name,
                description,
                category,
                brand,
                listPrice: parseFloat(listPrice.toString()),
                costPrice: costPrice !== undefined ? parseFloat(costPrice.toString()) : existingProduct.costPrice,
                stockQuantity: parseInt(stockQuantity.toString()),
                isActive: isActive !== undefined ? isActive : existingProduct.isActive
            }
        });

        return res.status(StatusCode.SUCCESS).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
};

export default updateProductsController;