import {Response,Request} from "express";
import { StatusCode } from "../../types";
import prisma from "../../utils/prismaClient";
import { generateAccessToken } from "../../utils/generateToken";
import { logActivity } from "../../utils/activityLogger";

const tokenController= async (req: Request, res: Response) => {
    try {
        // Assuming you have a way to identify the user, e.g., from a session or token
        const refreshToken=req.refreshToken // Replace with your actual user identification logic

        if (!refreshToken) {
            return res.status(StatusCode.UNAUTHORIZED).json({ message: "User not authenticated" });
        }

        // Generate a new access token for the user
        const accessToken = await generateAccessToken(refreshToken);

        // Set the access token in cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Adjust as necessary for your application
            maxAge: 10 * 1000 // 10 seconds
        });

        // Log activity for token refresh
        try {
            await logActivity({
                action: "Access Token Refreshed",
                details: {
                    distributorId: (req as any).user?.id || null,
                    userType: (req as any).user?.role || "distributor",
                    timestamp: new Date()
                },
                distributorId: (req as any).user?.id || null
            });
        } catch (activityError) {
            console.error("Failed to log activity:", activityError);
        }

        return res.status(StatusCode.SUCCESS).json({ message: "Access token generated successfully" });
    } catch (error) {
        console.error("Error generating access token:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}
export default tokenController