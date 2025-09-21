import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ name: String, email: String, password: String, createdAt: Date });
const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function GET(req, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findById(id, "-password");
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
