import { Request, Response } from "express";
import { logActivity } from "../../utils/activityLogger";

const distributorDashboardController = async (req: Request, res: Response) => {
    try {
        // Log activity for distributor dashboard access
        try {
            await logActivity({
                action: "Distributor Dashboard Accessed",
                details: {
                    distributorId: (req as any).user?.id || null,
                    email: (req as any).user?.email || null,
                    timestamp: new Date()
                },
                distributorId: (req as any).user?.id || null
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        res.json({
            message: "Distributor Dashboard",
            user: req.user
        });
    } catch (error) {
        console.error("Error in distributor dashboard:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default distributorDashboardController;
