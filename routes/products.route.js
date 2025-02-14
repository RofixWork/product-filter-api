import {Router} from "express";
import ProductController from "../controllers/products.controller.js";

/**
 * @type {Router}
 */
const productRouter = new Router();

// routes
productRouter.get('/', ProductController.all);

export default productRouter;