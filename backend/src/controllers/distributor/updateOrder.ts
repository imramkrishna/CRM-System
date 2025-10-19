import { Response, Request } from "express";
import { StatusCode } from "../../types";
import prisma from "../../utils/prismaClient";

const updateOrderController = async (req: Request, res: Response) => {
    try {
        console.log("Update order request params:", req.params);
        const orderId = req.params.id;
        const { notes, requestedDeliveryDate, orderItems, ...otherData } = req.body;

        // Prepare update data for Order table only
        const updateData: any = {
            ...otherData,
        };

        // Add notes if provided
        if (notes !== undefined) {
            updateData.notes = notes;
        }

        // Convert date string to ISO-8601 DateTime if provided
        if (requestedDeliveryDate) {
            updateData.requestedDeliveryDate = new Date(requestedDeliveryDate).toISOString();
        }

        // Update the order (without orderItems)
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: updateData,
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });
        console.log("Order updated successfully:", updatedOrder);
        return res.status(StatusCode.SUCCESS).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ 
            message: "Error updating order",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}

export default updateOrderController;