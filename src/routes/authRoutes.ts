import { Router } from "express";
import { login, me, register } from "../controllers/authControllers";
import { errorHandler } from "../error-handlder";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRoutes:Router = Router()

authRoutes.post('/register',errorHandler(register));
authRoutes.post('/login',errorHandler(login));
authRoutes.get('/me', [authMiddleware], errorHandler(me))



export default authRoutes