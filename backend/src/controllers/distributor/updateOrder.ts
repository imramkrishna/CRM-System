import { Response,Request } from "express";
import { StatusCode } from "../../types";
import prisma from "../../utils/prismaClient";
import { logActivity } from "../../utils/activityLogger";
const updateOrderController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const updateData = req.body;

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: updateData
        });

        // Log activity
        await logActivity({
            distributorId: updatedOrder.distributorId,
            action: "Order Updated",
            details: {
                orderId: updatedOrder.id,
                orderNumber: updatedOrder.orderNumber,
                changes: updateData
            }
        });

        return res.status(StatusCode.SUCCESS).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Error updating order" });
    }
}

export default updateOrderController;
