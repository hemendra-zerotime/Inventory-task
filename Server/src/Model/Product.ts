import { Schema, model, Document } from "mongoose";
export enum Category {
  Toys = "toys and game",
  Beverages = "food and beverages",
  Home = "Home and kitchen",
}
interface IProduct extends Document {
  name: String;
  category: Category;
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
    minlength: [3, "must be min of 3 character"],
  },
  category: {
    type: String,
    enum: Category,
    required: [true, "Please Enter Category!"],
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
productSchema.index({ name: "text", category: "text" })
const Product = model<IProduct>("Product", productSchema);

export default Product;
