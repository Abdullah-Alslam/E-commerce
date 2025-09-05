import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["laptops", "mobiles", "tablets", "accessories", "watches"], required: true },
  image: { type: String, required: true },
  specs: { type: Object, required: true },
}, { timestamps: true });

const Product = models.Product || model("Product", productSchema);
export default Product;
