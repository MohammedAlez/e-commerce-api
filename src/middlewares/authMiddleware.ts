import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../secrets";
import { prisma } from "..";


export const authMiddleware=async(req:Request, res:Response, next:NextFunction)=>{
    const accessToken = req.headers.authorization;
    console.log(accessToken)
    if(!accessToken){
        console.log('here ')
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
    try{
        const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as any
        const user = await prisma.user.findFirst({where:{id:payload.userInfo.id}})
        if(!user){
            console.log('here 2')
            return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        }
        req.body.user = user
        next();
    }catch(err){
        console.log('here 3')
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
}