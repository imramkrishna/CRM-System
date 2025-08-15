import express from "express";
import checkAccessTokenMiddleware from "../../middlewares/token/checkAccessToken.middleware";
import distributorDashboardController from "../../controllers/distributor/dashboard.controller";
import placeOrderController from "../../controllers/distributor/placeOrder";
import getOrdersController from "../../controllers/distributor/getOrders";
import updateOrderController from "../../controllers/distributor/updateOrder";
const distributorRouter = express.Router();

distributorRouter.use(checkAccessTokenMiddleware);

distributorRouter.get("/dashboard", distributorDashboardController);
distributorRouter.get("/get-orders",getOrdersController)
distributorRouter.post("/place-order", placeOrderController);
distributorRouter.put("/update-order/:id", updateOrderController);

export default distributorRouter;