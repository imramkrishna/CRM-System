import { Request, Response } from "express";
import { StatusCode } from "../../types";
import { logActivity } from "../../utils/activityLogger";

const dashboardController = async (req: Request, res: Response) => {
    try {
        // Log activity for dashboard access
        try {
            await logActivity({
                action: "Dashboard Accessed",
                details: {
                    adminId: (req as any).adminId || null,
                    timestamp: new Date()
                }
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        res.status(StatusCode.SUCCESS).json({ message: "Dashboard data" });
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}
export default dashboardController