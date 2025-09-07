import connectMongo from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "../../models/Products";
import { Buffer } from "buffer";

export async function POST(req) {
  try {
    await connectMongo();

    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const category = formData.get("category");
    const specs = formData.get("specs");
    const imageFile = formData.get("image");

    if (!name || !price || !category || !specs || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    const newProduct = await Product.create({
      name,
      price,
      category,
      specs,
      image: imageBuffer,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

// GET all products
export async function GET() {
  try {
    await connectMongo();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("❌ API GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
