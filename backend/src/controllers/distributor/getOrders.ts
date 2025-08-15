import { Request,Response } from "express";
import prisma from "../../utils/prismaClient";
const getOrdersController=async(req:Request,res:Response)=>{
    try {
        const distributorId = req.user?.id;
        const orders: {
            orders: any[],
            productsOrdered: any[]
        } = await prisma.$transaction(async (tx) => {
            const orders = await tx.order.findMany({
                where: { distributorId: distributorId },
                include: { orderItems: true }
            });
            const orderIds = orders.map(order => order.id);
            const productsOrdered = await tx.orderItem.findMany({
                where: { orderId: { in: orderIds } },
                include: { product: true }
            });
            return { orders, productsOrdered };
        });
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Error fetching orders" });
    }
}
export default getOrdersController