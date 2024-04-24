import express, { json } from 'express'
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errorsMiddleware';
import { SignupSchema } from './schema/users';


const app = express();

app.use(express.json())
app.use('/api',rootRouter)


export const prisma = new PrismaClient({
    log: ['query']
})

app.use(errorMiddleware);

app.listen(PORT,()=>{
    console.log("I'm listening")
})
