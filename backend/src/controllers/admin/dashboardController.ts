import { Request, Response } from "express";
import { StatusCode } from "../../types";

const dashboardController = async (req: Request, res: Response) => {
    try {
        res.status(StatusCode.SUCCESS).json({ message: "Dashboard data" });
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}
export default dashboardController