import express from "express";
import checkAccessTokenMiddleware from "../../middlewares/token/checkAccessToken.middleware";
import dashboardController from "../../controllers/admin/dashboardController";
import distributorController from "../../controllers/admin/distributorController";
import getOrdersController from "../../controllers/admin/getOrdersController";
import addOrderController from "../../controllers/admin/addOrdersController";
import addProductController from "../../controllers/admin/addProductController";

const adminRouter = express.Router();
adminRouter.use(checkAccessTokenMiddleware);
// Admin dashboard route
adminRouter.get("/dashboard", dashboardController);
adminRouter.get("/distributors", distributorController);
adminRouter.post("/addOrder", addOrderController);
adminRouter.get("/getOrders", getOrdersController);
adminRouter.post("/addProduct", addProductController);

export default adminRouter;
