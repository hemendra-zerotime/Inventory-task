import { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
  name: String;
  category: String;
  price: Number;
  stock: Number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema<IProduct>({
  name: {
    type: String,
    unique: true,
    required: [true, "Please Enter Name!"],
    minlength: [5, "must be min of 5 character"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Category!"],
    minlength: [5, "must be min of 5 character"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter stock!"],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
