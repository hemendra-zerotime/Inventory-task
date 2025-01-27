import { Request, Response } from "express";
import Product from "../Model/Product";

export const addProduct = async (req: Request, res: Response) => {
    const { name, category, price, stock } = req.body;
    try {
        const newProduct = await new Product({
            name: name,
            category: category,
            price: price,
            stock: stock,
            createdAt: Date.now(),
        });
        await newProduct.save();
        res.status(201).json({
            message: `Product has been added`,
            newProduct,
        });
    } catch (error) {
        console.log(error);
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
            message: `Failed to delete`
        })
    }
};

export const updateProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    try {

    } catch (error) {

    }
}
