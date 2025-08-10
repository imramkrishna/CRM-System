import express from "express";
import checkRefreshTokenMiddleware from "../../middlewares/token/checkRefreshToken.middleware";
import tokenController from "../../controllers/profile/token.controller";


const tokenRouter = express.Router();

tokenRouter.get("/getaccessToken", checkRefreshTokenMiddleware, tokenController)