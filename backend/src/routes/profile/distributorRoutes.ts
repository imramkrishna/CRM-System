import express from "express";
import checkAccessTokenMiddleware from "../../middlewares/token/checkAccessToken.middleware";
import distributorDashboardController from "../../controllers/distributor/dashboard.controller";
const distributorRouter = express.Router();

distributorRouter.use(checkAccessTokenMiddleware);

distributorRouter.get("/dashboard", distributorDashboardController);

export default distributorRouter;