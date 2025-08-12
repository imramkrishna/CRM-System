import prisma from "../../utils/prismaClient";
import { Request, Response } from "express";
import { StatusCode } from "../../types";
const getOrdersController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const orders = await prisma.order.findMany()
        const orderDetails = await prisma.orderItem.findMany({
            where: {
                orderId: {
                    in: orders.map(order => order.id)
                }
            }
        })
        return res.status(StatusCode.SUCCESS).json({ orderDetails });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch orders" });
    }
}
export default getOrdersController;
