import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

// User Schema with role field
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // possible roles: admin, user
  createdAt: { type: Date, default: Date.now },
});

// Hot reload prevention
const User = mongoose.models.User || mongoose.model("User", userSchema);

// POST /api/auth/login
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Determine role based on email
    const adminEmail = "admin@gmail.com"; // <-- put your admin email here
    const role = email === adminEmail ? "admin" : "user";

    // Create JWT token including role
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return response with token and role
    return NextResponse.json(
      {
        message: "Login successful",
        token,
        userId: user._id,
        name: user.name,
        role,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("Login error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
