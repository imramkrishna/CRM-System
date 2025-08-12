import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
const rejectDistributorController = async (req: Request, res: Response): Promise<Response | void> => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        await prisma.pendingRegistration.delete({
            where: { email }
        });
        res.json({ message: "Distributor rejected successfully" });
    } catch (error) {
        console.error("Error rejecting distributor:", error);
        res.status(500).json({ message: "Failed to reject distributor" });
    }
};

export default rejectDistributorController;
