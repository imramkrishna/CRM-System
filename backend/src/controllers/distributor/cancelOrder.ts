import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";

const cancelOrderController = async (req: Request, res: Response): Promise<Response | void> => {
    const id = req.params.id;
    
    try {
        const order = await prisma.order.findUnique({
            where: { id: id }
        });

        if (!order) {
            return res.status(StatusCode.NOT_FOUND).json({
                message: "The order does not exist"
            });
        }

        if (order.status === "CANCELLED") {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "The order is already cancelled"
            });
        }

        if (order.status === "DELIVERED") {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "The order cannot be cancelled as it is already delivered"
            });
        }

        // Use transaction for atomic operations
        await prisma.$transaction(async (tx) => {
            // Update order status to CANCELLED
            await tx.order.update({
                where: { id: id },
                data: { 
                    status: "CANCELLED",
                    updatedAt: new Date()
                }
            });

            // Add history entry for audit trail
            await tx.orderHistory.create({
                data: {
                    orderId: id,
                    fromStatus: order.status,
                    toStatus: "CANCELLED",
                    changeReason: "Order cancelled by distributor",
                    notes: "Order cancelled via API"
                }
            });
        });

        return res.status(StatusCode.SUCCESS).json({
            message: "Order cancelled successfully"
        });

    } catch (e) {
        console.error("Error cancelling order:", e);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Error while cancelling order"
        });
    }
};

export default cancelOrderController;