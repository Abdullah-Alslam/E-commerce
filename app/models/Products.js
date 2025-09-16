import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: true }, // رابط الصورة من Cloudinary
    category: { type: String, required: true },

    // 🔹 إضافات العروض
    discount: { type: Number, default: 0 }, // نسبة الخصم %
    hotDeal: { type: Boolean, default: false }, // إذا العرض مميز
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
