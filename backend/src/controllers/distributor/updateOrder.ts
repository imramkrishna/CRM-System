import { Response,Request } from "express";
import { StatusCode } from "../../types";
import prisma from "../../utils/prismaClient";
const updateOrderController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const updateData = req.body;

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: updateData
        });

        return res.status(StatusCode.SUCCESS).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Error updating order" });
    }
}

export default updateOrderController;
