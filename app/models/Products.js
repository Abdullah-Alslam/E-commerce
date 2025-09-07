import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["laptops", "mobiles", "tablets", "smart watches", "accessories"],
      required: true,
    },
    image: { type: Buffer, required: true }, // صورة مخزنة كـ Buffer
    specs: { type: String, required: true }, // نص الوصف/specifications
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);
export default Product;
