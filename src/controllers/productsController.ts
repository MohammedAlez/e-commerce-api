import { NextFunction, Request, Response } from "express";
import { ProductsSchema } from "../schema/products";
import { prisma } from "..";
import { NotFoundException } from "../exceptions/notFound";
import { ErrorCode } from "../exceptions/root";


export const createProduct=async(req:Request, res:Response, next:NextFunction)=>{

    // ProductsSchema.parse(req.body)
    const fabricationDate = new Date(req.body.fabricationDate);
    const expirationDate = new Date(req.body.expirationDate);
    // const price 
    console.log(req.body)
    const product = await prisma.product.create({
        data:{
            ...req.body,
            fabricationDate,
            expirationDate
        }
    })

    console.log(product);

    res.json({
        data:product
    })
}

export const updateProduct=async(req:Request, res:Response, next:NextFunction)=>{
    
    
    try{
        const product = req.body.data
        if(product.fabricationDate)
            product.fabricationDate = new Date(product.fabricationDate)
        if(product.expirationDate)
            product.expirationDate = new Date(product.expirationDate)

        const updatedProduct = await prisma.product.update({
            where:{
                id:req.params.id
            },
            data:product
        })
        res.json({
            data:updatedProduct
        })
    }catch(err){
        throw new NotFoundException("Product Not Found", null, ErrorCode.PRODUCT_NOT_FOUND)
    }
}


export const deleteProduct=async(req:Request, res:Response)=>{

    try{
        const updatedProduct = await prisma.product.delete({
            where:{
                id:req.params.id
            }
        })
        res.json({
            message:"product deleted successfully"
        })
    }catch(err){
        throw new NotFoundException("Product Not Found", null, ErrorCode.PRODUCT_NOT_FOUND)
    }
}
export const getProducts=async(req:Request, res:Response, next:NextFunction)=>{

    const products = await prisma.product.findMany({
        skip: +req.query.skip! || 0,
        take:5
    });

    res.json({
        data:products
    })
}

export const getProductById=async(req:Request, res:Response, next:NextFunction)=>{
    
    try{
        const product = await prisma.product.findFirst({
            where:{
                id:req.params.id
            },
        })
        res.json({
            data:product
        })
    }catch(err){
        throw new NotFoundException("Product Not Found", null, ErrorCode.PRODUCT_NOT_FOUND)
    }
}
