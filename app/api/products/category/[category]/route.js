import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "../../../../models/Products";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { category } = params;

    const products = await Product.find({ category });
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
