import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import { logActivity } from "../../utils/activityLogger";

const rejectDistributorController = async (req: Request, res: Response): Promise<Response | void> => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        // Get the pending registration details before deletion for logging
        const pendingRegistration = await prisma.pendingRegistration.findUnique({
            where: { email }
        });

        await prisma.pendingRegistration.delete({
            where: { email }
        });

        // Log activity for distributor rejection
        try {
            await logActivity({
                action: "Distributor Rejected",
                details: {
                    email: email,
                    companyName: pendingRegistration?.companyName || "Unknown",
                    ownerName: pendingRegistration?.ownerName || "Unknown",
                    rejectedBy: (req as any).adminId || "admin"
                }
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        res.json({ message: "Distributor rejected successfully" });
    } catch (error) {
        console.error("Error rejecting distributor:", error);
        res.status(500).json({ message: "Failed to reject distributor" });
    }
};

export default rejectDistributorController;
