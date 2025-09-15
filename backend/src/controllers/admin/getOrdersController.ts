import prisma from "../../utils/prismaClient";
import { Request, Response } from "express";
import { StatusCode } from "../../types";
import { logActivity } from "../../utils/activityLogger";

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
                        }
                    }
                }
            }
        })

        // Log activity for orders retrieval
        try {
            await logActivity({
                action: "Orders Retrieved",
                details: {
                    totalOrders: orders.length,
                    totalOrderItems: orderDetails.length,
                    adminId: (req as any).adminId || null
                }
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        return res.status(StatusCode.SUCCESS).json({ orderDetails, orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch orders" });
    }
}
export default getOrdersController;
