// src/middlewares/accessTokenCheck.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCode } from "../../types";
import { User } from "../../types";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const checkAccessTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: "Access token required" });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as User;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: "Invalid access token" });
    }
};

export default checkAccessTokenMiddleware;