import express from 'express';
import loginController from '../../controllers/auth/login.controller';
import registerController from '../../controllers/auth/register.controller';
import verifyPendingRegistrationController from '../../controllers/auth/verify.controller';
import adminController from '../../controllers/auth/adminController';
import adminLoginController from '../../controllers/auth/adminLogin.controller';
import checkAccessToken from '../../middlewares/token/checkAccessToken.middleware';
import pendingDistributorsController from '../../controllers/auth/pendingDistributors.middlware';
import checkAccessTokenMiddleware from '../../middlewares/token/checkAccessToken.middleware';
import rejectDistributorController from '../../controllers/auth/rejectDistributor';
import getProductsController from '../../controllers/products/getProductsController';


const authRouter = express.Router();

authRouter.post('/login', loginController);

authRouter.post('/register', registerController);

authRouter.get("/products",getProductsController)

authRouter.post('/verifyDistributor', checkAccessTokenMiddleware, verifyPendingRegistrationController);

authRouter.post('/rejectDistributor', checkAccessTokenMiddleware, rejectDistributorController);

authRouter.get('/pendingDistributors', checkAccessToken, pendingDistributorsController);

authRouter.post('/adminLogin', adminLoginController);

// Simple ping endpoint for token refresh
authRouter.get('/ping', (req, res) => {
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Debug endpoint to check cookies
authRouter.get('/debug/cookies', (req, res) => {
    res.json({
        cookies: req.cookies,
        headers: req.headers,
        timestamp: new Date().toISOString()
    });
});

// Verify endpoint to check if current token is valid
authRouter.get('/verify', checkAccessToken, (req, res) => {
    // If middleware passes, token is valid
    res.json({
        valid: true,
        user: req.user,
        timestamp: new Date().toISOString()
    });
});

// authRouter.post("/create-admin", adminController);

export default authRouter;
