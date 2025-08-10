import { Request, Response } from "express";

const distributorDashboardController = (req: Request, res: Response) => {
    res.json({
        message: "Distributor Dashboard",
        user: req.user
    });
};

export default distributorDashboardController;
