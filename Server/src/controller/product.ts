import { Request, Response } from "express";
import Product from "../Model/Product";


export const addProduct = async (req: Request, res: Response) => {
    const { name, category, price, stock } = req.body;
    try {
        const newProduct = await Product.create({
            name: name,
            category: category,
            price: price,
            stock: stock,
            createdAt: Date.now()
        });
        res.status(201).json({
            message: `Product has been added`,
            newProduct,
        });
    } catch (error) {
        if (error instanceof Error)
            if (error.message.split(" ")[0] === "E11000")
                res.status(409).json({ message: "Product already in stock" })
    }
};

export const viewAllProduct = async (req: Request, res: Response) => {
    try {
        const data = await Product.find({});
        res.status(200).json({
            message: "All Available Product",
            data: data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const viewProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await Product.findOne({ _id: id }, { _id: 0, __v: 0 });
        if (data == null) throw Error;
        res.status(200).json({
            message: `Product get successfully`,
            data,
        });
    } catch (error) {
        res.status(404).json({
            message: `No product available`,
        });
    }
};


export const deleteProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await Product.deleteOne({ _id: id });
        if (data.deletedCount == 0) throw Error
        res.status(200).json({
            message: `Product deleted successfully`,
        });
    } catch (error) {
        res.status(404).json({
            message: `Product not found to delete`
        })
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;
    try {
        const data = await Product.updateOne({ _id: id }, { $set: { name, category, price, stock, updatedAt: Date.now() } });
        if (data.modifiedCount === 0) throw Error
        res.status(200).json({
            message: "Product data has been updated"
        })
    } catch (error) {
        res.status(200).json({
            message: "Error in update"
        })
    }
}
