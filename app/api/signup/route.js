import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

// تعريف Schema و Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// منع إعادة تعريف الموديل عند hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(req) {
  try {
    // قراءة البيانات من الطلب
    const { name, email, password } = await req.json();

    // التحقق من الحقول
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // الاتصال بقاعدة البيانات
    await connectToDatabase();

    // تحقق إذا البريد موجود مسبقًا
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // تشفير الباسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // إرسال الرد عند النجاح
    return NextResponse.json(
      { message: "User registered successfully", userId: newUser._id },
      { status: 201 }
    );

  } catch (err) {
    // معالجة الأخطاء
    console.error("Signup error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
