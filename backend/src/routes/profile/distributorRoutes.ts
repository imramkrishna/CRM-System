import express from "express";
import checkAccessTokenMiddleware from "../../middlewares/token/checkAccessToken.middleware";
import distributorDashboardController from "../../controllers/distributor/dashboard.controller";
import placeOrderController from "../../controllers/distributor/placeOrder";
const distributorRouter = express.Router();

distributorRouter.use(checkAccessTokenMiddleware);

distributorRouter.get("/dashboard", distributorDashboardController);
distributorRouter.post("/place-order", placeOrderController);
export default distributorRouter;