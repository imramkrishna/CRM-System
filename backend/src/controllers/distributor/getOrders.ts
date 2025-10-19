import { Request,Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";
const getOrdersController=async(req:Request,res:Response):Promise<Response | void>=>{
    try {
        const distributorId = req.user?.id;
        console.log("Fetching orders for distributor ID:", distributorId);
        if (!distributorId) {
            return res.status(StatusCode.BAD_REQUEST).json({ message: "Distributor ID not found in token" });
        }
        
        const orders = await prisma.order.findMany({
            where: { distributorId: distributorId },
            include: { 
                orderItems: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Extract all products ordered from the nested structure
        const productsOrdered = orders.flatMap(order => 
            order.orderItems.map(item => ({
                ...item,
                order: {
                    id: order.id,
                    status: order.status,
                    createdAt: order.createdAt
                }
            }))
        );
        console.log("Fetched Products ordered:", productsOrdered);
        return res.status(StatusCode.SUCCESS).json({ orders, productsOrdered });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Error fetching orders" });
    }
}
export default getOrdersController