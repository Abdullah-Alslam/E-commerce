import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
