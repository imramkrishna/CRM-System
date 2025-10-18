import prisma from "../../utils/prismaClient";
import { Request, Response } from "express";
import { StatusCode } from "../../types";

const getOrdersController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                distributor: {
                    select: {
                        id: true,
                        ownerName: true,
                        companyName: true,
                        email: true,
                        phone: true,
                        address: true
                    }
                },
                paymentStatusRequest: {
                    select: {
                        id: true,
                        PaymentMode: true,
                        TxnId: true,
                        ConfirmationSlip: true,
                        requestedAt: true,
                        updatedAt: true,
                        paymentRequestAt: true,
                        paymentUpdatedAt: true
                    }
                }
            }
        })
        const orderDetails = await prisma.orderItem.findMany({
            where: {
                orderId: {
                    in: orders.map(order => order.id)
                }
            },
            include: {
                order: {
                    include: {
                        distributor: {
                            select: {
                                id: true,
                                ownerName: true,
                                companyName: true,
                                email: true,
                                phone: true,
                                address: true
                            }
                        },
                        paymentStatusRequest: {
                            select: {
                                id: true,
                                PaymentMode: true,
                                TxnId: true,
                                ConfirmationSlip: true,
                                requestedAt: true,
                                updatedAt: true,
                                paymentRequestAt: true,
                                paymentUpdatedAt: true
                            }
                        }
                    }
                }
            }
        })


        return res.status(StatusCode.SUCCESS).json({ orderDetails, orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch orders" });
    }
}
export default getOrdersController;
