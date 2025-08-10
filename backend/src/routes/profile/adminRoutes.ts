import express from "express";
import checkAccessTokenMiddleware from "../../middlewares/token/checkAccessToken.middleware";
import dashboardController from "../../controllers/admin/dashboard.controller";

const adminRouter = express.Router();
adminRouter.use(checkAccessTokenMiddleware);
// Admin dashboard route
adminRouter.get("/dashboard", dashboardController);

export default adminRouter;
