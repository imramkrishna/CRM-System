import { Request, Response, NextFunction } from "express"
import { StatusCode, User } from "../../types"
import prisma from "../../utils/prismaClient"
import jwt, { decode } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            refreshToken?: string; // Add user property to Request interface
        }
    }
}
const checkRefreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: "Refresh token is required" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as User;
    if (!decoded) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: "Invalid refresh token", action: "login again" });
    }
    try {
        // Check if the refresh token exists in the database
        if (decoded.role !== "distributor" && decoded.role !== "admin") {
            throw new Error("Invalid user role");
        }
        if (decoded.role == "distributor") {
            const tokenRecord = await prisma.distributorLoginSessions.findFirst({
                where: { refreshToken, distributorId: decoded.id },
            });
            if (!tokenRecord) {
                return res.status(StatusCode.UNAUTHORIZED).json({ message: "Invalid refresh token" });
            }
        } else if (decoded.role == "admin") {
            const tokenRecord = await prisma.adminLoginSessions.findFirst({
                where: { refreshToken, adminId: decoded.id },
            });
            if (!tokenRecord) {
                return res.status(StatusCode.UNAUTHORIZED).json({ message: "Invalid refresh token" });
            }
        }



        // If the token is valid, proceed to the next middleware or route handler
        req.refreshToken = refreshToken;
        next();
    } catch (error) {
        console.error("Error checking refresh token:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
};
export default checkRefreshTokenMiddleware;