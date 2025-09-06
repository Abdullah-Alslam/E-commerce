import connectMongo from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "../../models/Products";

export async function POST(req) {
  try {
    await connectMongo();

    const { name, price, category, image, specs } = await req.json();

    if (!name || !price || !category || !image || !specs) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      name,
      price,
      category,
      image,
      specs,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

