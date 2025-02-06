import { NextFunction, Request, Response } from "express";
import Product from "../Model/Product";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, category, price, stock } = req.body;
  try {
    const newProduct = await Product.create({
      name: name,
      category: category,
      price: price,
      stock: stock,
      createdAt: Date.now(),
    });
    res.status(201).json({
      message: `Product has been added`,
      newProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.split(" ")[0] === "E11000")
        res.status(409).json({ message: "Product already in stock" });
    }
    else {
      next(error);
    }
  }
};

export const viewAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;

  try {
    if (query.name !== undefined) {
      let data = await Product.find({ $text: { $search: `${query.name}` } });
      res.status(200).json({
        message: `Product with ${query.name}`,
        data: data,
      });
    } else if (query.category !== undefined) {
      let data = await Product.find({
        $text: { $search: `${query.category}` },
      });
      res.status(200).json({
        message: `Product with ${query.category}`,
        data: data,
      });
    } else {
      let data = await Product.find({});
      res.status(200).json({
        message: "Available Product",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const viewProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const data = await Product.findOne({ _id: id }, { __v: 0 });
    if (data == null) {
      res.status(404).json({
        message: `Failed to get invalid Product id`,
      });
    }
    res.status(200).json({
      message: `Product get successfully`,
      data,
    });
  } catch (error) {
    if (error instanceof Error)
      if (error.name === "CastError")
        res.status(400).json({
          message: "Failed to get invalid Product id",
        });
      else {
        next(error);
      }
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const data = await Product.findOneAndDelete({ _id: id });
    if (data == null) {
      res.status(404).json({
        message: `Delete Failed invalid Product id`,
      });
    }
    res.status(200).json({
      message: `Product deleted successfully`,
    });
  } catch (error) {
    if (error instanceof Error)
      if (error.name === "CastError")
        res.status(400).json({
          message: "Delete Failed invalid Product id",
        });
      else {
        next(error);
      }
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, category, price, stock } = req.body;
  try {
    const existingData = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { name, category, price, stock, updatedAt: Date.now() } }
    );
    if (existingData == null) {
      res.status(400).json({
        message: "Invalid Product update failed",
      });
    }
    res.status(200).json({
      message: "data has been updated",
    });
  } catch (error) {
    if (error instanceof Error)
      if (error.name === "CastError")
        res.status(400).json({
          message: "Invalid Product update failed",
        });
      else {
        next(error);
      }
  }
};

export const viewAnalytics = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lowStock = await Product.find({ stock: { $lt: 5 } });
    const data = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
        },
      },
    ]);
    if (data.length !== 0)
      res.status(200).json({
        message: "analytics data",
        totalLowStock: lowStock.length,
        totalProducts: data[0].totalProducts,
        averagePriceOfAllProducts: data[0].averagePrice,
        lowStock,
      });
    else if (data.length == 0) {
      res.status(200).json({
        message: "analytics data",
        totalLowStock: 0,
        totalProducts: 0,
        averagePriceOfAllProducts: 0,
        lowStock,
      });
    }
  } catch (error) {
    next(error);
  }
};
