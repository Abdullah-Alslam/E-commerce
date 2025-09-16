import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Wishlist from "../../models/Wishlist";

export async function GET() {
  await connectDB();
  try {
    const items = await Wishlist.find({});
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const exists = await Wishlist.findOne({ productId: body.productId });

    if (exists) {
      return NextResponse.json({ message: "Already in wishlist" }, { status: 400 });
    }

    const newItem = await Wishlist.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
