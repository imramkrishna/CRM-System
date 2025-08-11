import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import { StatusCode } from "../../types";
const pendingDistributorsController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const distributors = await prisma.pendingRegistration.findMany();
        return res.status(StatusCode.SUCCESS).json({
            message: "Fetched pending distributors successfully",
            distributors
        });
    } catch (error) {
        console.error("Error fetching pending distributors:", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

export default pendingDistributorsController;
