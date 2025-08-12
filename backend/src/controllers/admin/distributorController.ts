import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";
const distributorController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const distributors = await prisma.distributor.findMany();
        return res.status(StatusCode.SUCCESS).json({ distributors });
    } catch (error) {
        console.error('Error fetching distributors:', error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch distributors' });
    }
}
export default distributorController;