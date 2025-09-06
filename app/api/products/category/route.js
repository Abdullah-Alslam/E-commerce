import connectMongo from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "../../../models/Products";

export async function GET(req) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let products;
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
