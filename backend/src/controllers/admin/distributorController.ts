import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";
import { logActivity } from "../../utils/activityLogger";

const distributorController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const distributors = await prisma.distributor.findMany();

        // Log activity for distributors retrieval
        try {
            await logActivity({
                action: "Distributors Retrieved",
                details: {
                    totalDistributors: distributors.length,
                    adminId: (req as any).adminId || null
                }
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        return res.status(StatusCode.SUCCESS).json({ distributors });
    } catch (error) {
        console.error('Error fetching distributors:', error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch distributors' });
    }
}
export default distributorController;