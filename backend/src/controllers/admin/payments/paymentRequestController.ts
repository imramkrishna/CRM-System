import { Request,Response } from "express";
import { logActivity } from "../../../utils/activityLogger";
import prisma from "../../../utils/prismaClient";
import { StatusCode } from "../../../types";
const paymentRequestController = async (req: Request, res: Response):Promise<Response | void> => {
    try {
        const { orderId, TxnId, PaymentMode,ConfirmationSlip } = req.body;
        if (!orderId || !PaymentMode) {
            return res.status(StatusCode.BAD_REQUEST).json({ error: "orderId, TxnId and paymentMode are required" });
        }
        // Check if order exists
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            return res.status(StatusCode.NOT_FOUND).json({ error: "Order not found" });
        }

        // Check if a payment request already exists for the order
        const existingRequest = await prisma.paymentStatusRequest.findUnique({
            where: { orderId },
        });

        if (existingRequest) {
            return res.status(StatusCode.CONFLICT).json({ error: "Payment request already exists for this order" });
        }
        if(PaymentMode === "CASH_ON_DELIVERY"){
            await prisma.paymentStatusRequest.create({
                data: {
                    orderId,
                    PaymentMode
                }
            });
            await logActivity({
                action: "Payment Request Created",
                details: {
                    orderId,
                    PaymentMode,
                    distributorId: (req as any).user?.id || null,
                    email: (req as any).user?.email || null,
                    timestamp: new Date()
                },
                distributorId: (req as any).user?.id || null
            }); 
            return res.status(StatusCode.CREATED).json({
                message: "Payment request created successfully",
                paymentRequest: {
                    orderId,
                    PaymentMode
                }
            });
        }
        if(PaymentMode === "CHEQUE_ON_DELLIVERY" && !ConfirmationSlip){
            return res.status(StatusCode.BAD_REQUEST).json({ error: "ConfirmationSlip is required for CHEQUE_ON_DELIVERY" });
        }
        // Create a new payment request
        const paymentRequest = await prisma.paymentStatusRequest.create({
            data: {
                orderId,
                TxnId,
                PaymentMode,
                ConfirmationSlip
            },
        });
        
        // Log activity for payment request creation
        try {
            await logActivity({
                action: "Payment Request Created",
                details: {
                    orderId,
                    TxnId,
                    PaymentMode,
                    ConfirmationSlip,
                    distributorId: (req as any).user?.id || null,
                    email: (req as any).user?.email || null,
                    timestamp: new Date()
                },
                distributorId: (req as any).user?.id || null
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        return res.status(StatusCode.CREATED).json({
            message: "Payment request created successfully",
            paymentRequest,
        });
    } catch (error) {
        console.error("Error in payment request controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default paymentRequestController;