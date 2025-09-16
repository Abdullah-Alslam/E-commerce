// app/api/cart/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Cart from "../../models/Cart";

connectDB();

export async function GET() {
  try {
    const items = await Cart.find({});
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json(); // { productId, name, price, image, quantity? }

    const exists = await Cart.findOne({ productId: data.productId });
    if (exists) {
      // لو المنتج موجود بالفعل، نزود الكمية
      exists.quantity += data.quantity || 1;
      await exists.save();
      return NextResponse.json(exists);
    }

    const newItem = await Cart.create(data);
    return NextResponse.json(newItem);
  } catch (err) {
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
