
import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productsController";
import { errorHandler } from "../error-handlder";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const productRoutes = Router();

productRoutes.post('/',errorHandler(createProduct))
productRoutes.get('/',[authMiddleware, adminMiddleware],errorHandler(getProducts))
productRoutes.get('/:id',[authMiddleware, adminMiddleware],errorHandler(getProductById))
productRoutes.put('/:id',[authMiddleware, adminMiddleware],errorHandler(updateProduct))
productRoutes.delete('/:id',[authMiddleware, adminMiddleware],errorHandler(deleteProduct))

export default productRoutes