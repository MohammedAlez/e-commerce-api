import {Router} from 'express'
import authRoutes from './authRoutes';
import productRoutes from './productsRoutes';

const rootRouter:Router = Router();

rootRouter.use('/auth',authRoutes)
rootRouter.use('/products',productRoutes)

export default rootRouter