import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Cart from "../../models/Cart";

export async function GET() {
  try {
    await connectDB();
    const items = await Cart.find({});
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    console.log("🟡 Received data:", data);

    const exists = await Cart.findOne({ productId: data.productId });

    if (exists) {
      exists.quantity += data.quantity || 1;
      await exists.save();
      return NextResponse.json(exists);
    }

    const newItem = await Cart.create(data);
    return NextResponse.json(newItem);
  } catch (err) {
    console.error("❌ Cart POST error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to add to cart" },
      { status: 500 }
    );
  }
}
