import { string, z } from "zod";



export const ProductsSchema= z.object({
    name:z.string(),
    description:z.string(),
    price:z.number(),
    fabricationDate:z.date(),
    expirationDate:z.date(),
    image: z.string()
})