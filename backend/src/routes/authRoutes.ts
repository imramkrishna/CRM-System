import express from 'express';
import loginController from '../controllers/auth/login.controller';
import registerController from '../controllers/auth/register.controller';
import verifyPendingRegistrationController from '../controllers/auth/verify.controller';
import adminController from "../controllers/auth/adminController";
import adminLoginController from "../controllers/auth/adminLogin.controller";
const authRouter = express.Router();

authRouter.post('/login', loginController);

authRouter.post('/register', registerController);

authRouter.post('/verifyDistributor', verifyPendingRegistrationController);

authRouter.post('/adminLogin', adminLoginController);

// authRouter.post("/create-admin", adminController);

export default authRouter;
