import express from 'express';
import getProductsController from '../../controllers/products/getProductsController';

const productsRouter = express.Router();

// Public routes - no authentication required
productsRouter.get("/", getProductsController);

export default productsRouter;
