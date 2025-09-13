import express from "express";
import checkAccessTokenMiddleware from "../../middlewares/token/checkAccessToken.middleware";
import dashboardController from "../../controllers/admin/dashboardController";
import distributorController from "../../controllers/admin/distributorController";
import getOrdersController from "../../controllers/admin/getOrdersController";
import addOrderController from "../../controllers/admin/addOrdersController";
import addProductController from "../../controllers/admin/addProductController";
import getProductsController from "../../controllers/products/getProductsController";
import updateProductsController from "../../controllers/products/updateProducts";
import checkAdminMiddleware from "../../middlewares/token/checkAdmin";
import updateDistributorController from "../../controllers/admin/updateDistributorController";
const adminRouter = express.Router();
adminRouter.use(checkAccessTokenMiddleware);
// Admin dashboard route
adminRouter.get("/dashboard", dashboardController);
adminRouter.get("/distributors", distributorController);
adminRouter.post("/addOrder", addOrderController);
adminRouter.get("/getOrders", getOrdersController);
adminRouter.post("/addProduct", addProductController);
adminRouter.get("/getProducts", getProductsController);
adminRouter.put("/updateProduct", checkAdminMiddleware, updateProductsController);
adminRouter.put("/updatedistributor/:id",updateDistributorController)
export default adminRouter;
