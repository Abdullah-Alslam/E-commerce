import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import Cart from "../../../models/Cart";
// DELETE /api/cart/:id
export async function DELETE(req, { params }) {
  try {
    await connectDB(); // تأكد من الاتصال بـ MongoDB

    const { id } = params;

    // فحص الـ id إذا كان صحيح
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const deleted = await Cart.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}