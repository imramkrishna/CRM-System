import { Request,Response } from "express";
import { StatusCode } from "../../types";

const checkAdminMiddleware = async (req: Request, res: Response, next: Function): Promise<Response | void> => {
    try {
        // Assuming req.user is populated by a previous authentication middleware
        const user = req.user;

        if (!user || user.role !== "admin") {
            return res.status(StatusCode.FORBIDDEN).json({ message: "Access denied." });
        }

        // User is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error checking admin role:", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
};

export default checkAdminMiddleware;