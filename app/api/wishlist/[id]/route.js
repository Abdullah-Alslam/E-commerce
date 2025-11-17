import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import Wishlist from "../../../models/Wishlist";

export async function DELETE(_, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    await Wishlist.findByIdAndDelete(id);
    return NextResponse.json({ message: "Item removed successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Error deleting item" }, { status: 500 });
  }
}
