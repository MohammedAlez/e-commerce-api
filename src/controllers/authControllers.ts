import { NextFunction, Request, Response } from "express";
import { User } from "../../typesva/users";
import {hashSync, compare, compareSync} from 'bcrypt'
import { prisma } from "..";
import * as jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCode, HttpException } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/notFound";

export async function register(req:Request, res:Response, next:NextFunction){
    
        SignupSchema.parse(req.body)
        const {firstName, lastName, email, password}:User = req.body
        const findUser = await prisma.user.findFirst({where:{email}})
        if(findUser){
            new BadRequestException('User Already Exist', ErrorCode.USER_ALREADY_EXIST)
        }
        const user = await prisma.user.create({
            data:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:hashSync(password,10)
            }
        })
        res.json({
            message:"user createed succussfullfy ",
            data:{...user}
        })
}


export async function login(req:Request, res:Response, next:NextFunction){
    const { email, password }:User = req.body

    const findUser = await prisma.user.findFirst({where:{email}})
    if(!findUser){
        throw new NotFoundException('User Not Founddd', {}, ErrorCode.USER_NOT_FOUND)
    }
    if(!compareSync(password, findUser.password)){
        new BadRequestException('Incorrect Password', ErrorCode.INCORRECT_PASSWORD)
    }
    const accessToken = jwt.sign({
        userInfo:{
            id:findUser.id
        }
    },ACCESS_TOKEN_SECRET,{
        expiresIn:'1d'
    })
    res.json({
        message:"user logged in succussfullfy",
        accessToken
    })
    
}


export const me=(req:Request, res:Response, next:NextFunction)=>{

    res.json({
        data:req.body.user
    })
}