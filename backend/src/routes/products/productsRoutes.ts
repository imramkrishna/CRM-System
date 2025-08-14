import express from 'express';
import getProductsController from '../../controllers/products/getProductsController';
import { getProductById } from '../../controllers/products/getProductByIdController';

const productsRouter = express.Router();

// Public routes - no authentication required
productsRouter.get("/", getProductsController);

export default productsRouter;
