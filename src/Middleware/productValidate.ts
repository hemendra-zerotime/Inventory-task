import { Request, Response } from "express"
export const postValidate = (req: Request, res: Response) => {
    const { name, category, price, stock } = req.body
    
}