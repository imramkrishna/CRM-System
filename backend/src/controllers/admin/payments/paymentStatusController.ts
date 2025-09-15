import { Request,Response } from "express";
import { logActivity } from "../../../utils/activityLogger";
import prisma from "../../../utils/prismaClient";
import { StatusCode } from "../../../types";
const paymentStatusController = async (req: Request, res: Response):Promise<Response | void> => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(StatusCode.BAD_REQUEST).json({ error: "orderId is required" });
        }

        // Check if the payment request exists
        const paymentRequest = await prisma.paymentStatusRequest.findUnique({
            where: { orderId },
        });

        if (!paymentRequest) {
            return res.status(StatusCode.NOT_FOUND).json({ error: "Payment request not found" });
        }
        //upadte order payment status to 'PAID'
        await prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: 'PAID' },
        });         
        await logActivity({
            action: "Payment Request Retrieved",
            details: {
                orderId,
                distributorId: (req as any).user?.id || null,
                email: (req as any).user?.email || null,
                timestamp: new Date()
            },
            distributorId: (req as any).user?.id || null
        });
        return res.status(StatusCode.SUCCESS).json({
            message: "Payment request retrieved successfully",
            paymentRequest,
        });
       
    } catch (error) {
        console.error("Error in payment status controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }   
}
export default paymentStatusController;