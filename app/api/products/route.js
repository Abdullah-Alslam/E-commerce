import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "../../models/Products";

export async function GET(req) {
  try {
    await connectDB();
    console.log("MongoDB connected ✅");

    // استعلام جميع المنتجات بدون فلترة
    const products = await Product.find().sort({ createdAt: -1 });
    console.log("Products fetched:", products.length);

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, price, description, image, category } = body;

    if (!name || !price || !image || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      price,
      description,
      image,
      category,
    });
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
