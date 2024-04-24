import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internalException";



export const errorHandler=(methode:Function)=>{ // Accept controller as a paramater
    return async(req:Request, res:Response, next:NextFunction)=>{ // return a controller 
        try{
            await methode(req, res, next)
        }catch(err:any){
            console.log(err);
            let exception:HttpException;
            if(err instanceof HttpException){
                exception = err;
            }else{
                exception = new InternalException('Something Went Wrong', err, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception)
        }
    }
}