import connectDB from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const items = await Wishlist.find({});
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json(); // { productId, name, price, image }
    const exists = await Wishlist.findOne({ productId: data.productId });
    if (exists)
      return NextResponse.json(
        { message: "Already in wishlist" },
        { status: 400 }
      );

    const newItem = await Wishlist.create(data);
    return NextResponse.json(newItem);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { productId } = await req.json();
    const deleted = await Wishlist.findOneAndDelete({ productId });
    if (!deleted)
      return NextResponse.json({ message: "Item not found" }, { status: 404 });

    return NextResponse.json({ message: "Removed from wishlist" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
