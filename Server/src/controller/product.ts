import { NextFunction, Request, Response } from "express";
import Product from "../Model/Product";


export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
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
        console.log(error)
        if (error instanceof Error)
            if (error.message.split(" ")[0] === "E11000")
                res.status(409).json({ message: "Product already in stock" })
    }
};

export const viewAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req

    try {
        if (query.name !== undefined) {
            let data = await Product.find({ $text: { $search: `${query.name}` } });
            res.status(200).json({
                message: `Product with ${query.name}`,
                data: data
            });
        }
        else if (query.category !== undefined) {
            let data = await Product.find({ $text: { $search: `${query.category}` } });
            res.status(200).json({
                message: `Product with ${query.category}`,
                data: data
            });
        }
        else {
            let data = await Product.find({})
            res.status(200).json({
                message: "All Available Product",
                data: data
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
};

export const viewProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await Product.findOne({ _id: id }, { _id: 0, __v: 0 });
        if (data == null) {
            res.status(404).json({
                message: `No product available`,
            });
        }
        res.status(200).json({
            message: `Product get successfully`,
            data,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
};


export const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await Product.deleteOne({ _id: id });
        if (data.deletedCount == 0) {
            res.status(404).json({
                message: `Product not found to delete`
            })
        }

        res.status(200).json({
            message: `Product deleted successfully`,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;
    try {
        const data = await Product.updateOne({ _id: id }, { $set: { name, category, price, stock, updatedAt: Date.now() } });
        if (data.modifiedCount === 1) {
            res.status(200).json({
                message: "Product data has been updated"
            })
        }
        else {
            res.status(200).json({
                message: "Error in update"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}


export const viewLowStock = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const lowStock = await Product.find({ stock: { $lt: 5 } })
        const data = await Product.aggregate([{ $group: { _id: null, totalProducts: { $sum: 1 }, averagePrice: { $avg: "$price" } } }])

        if (lowStock.length !== 0) {
            res.status(200).json({
                message: "stock running out",
                totalLowStockCount: lowStock.length,
                totalProductsCount: data[0].totalProducts,
                averagePriceOfProducts: data[0].averagePrice,
                lowStock
            })
        }
        else {
            res.status(404).json({
                message: "No item having less stock",
                totalLowStock: lowStock.length,
                lowStock
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}