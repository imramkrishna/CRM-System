import express from 'express';
import loginController from '../controllers/auth/login.controller';
import registerController from '../controllers/auth/register.controller';
import verifyPendingRegistrationController from '../controllers/auth/verify.controller';
const authRouter = express.Router();

authRouter.post('/login', loginController);

authRouter.post('/register', registerController);

authRouter.post('/verifyDistributor', verifyPendingRegistrationController);

export default authRouter;
