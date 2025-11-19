import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Wishlist from "../../models/Wishlist";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await Wishlist.find();
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const newItem = new Wishlist(data);
    await newItem.save();

    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Error adding item" }, { status: 500 });
  }
}
