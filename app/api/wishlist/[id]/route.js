import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Wishlist from "../../../models/Wishlist";

// DELETE /api/wishlist/:id
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await Wishlist.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
