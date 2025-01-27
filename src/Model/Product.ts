import { Schema, model } from "mongoose";

interface IProduct {
    name: String,
    category: String,
    price: Number,
    stock: Number,
    createdAt: Date,
    updatedAt: Date
}


const productSchema: Schema = new Schema<IProduct>({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

const Product = model<IProduct>("Product", productSchema)

export default Product