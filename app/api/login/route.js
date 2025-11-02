import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const adminEmail = "admin@gmail.com";
    const role = email === adminEmail ? "admin" : "user";

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🧠 الخطوة المهمة: إنشاء الرد
    const response = NextResponse.json(
      {
        message: "Login successful",
        userId: user._id,
        name: user.name,
        role,
      },
      { status: 200 }
    );

    // 🍪 إضافة الكوكي
    response.cookies.set("token", token, {
      httpOnly: true, // أمان ضد XSS
      secure: process.env.NODE_ENV === "production", // فقط https بالإنتاج
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 أيام
      path: "/",
    });

    response.cookies.set("userId", user._id.toString(), {
      httpOnly: false, // مسموح الوصول إليه من client
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
