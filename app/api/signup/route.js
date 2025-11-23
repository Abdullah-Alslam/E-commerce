import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// 1. Define the schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

// 2. Hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

// 3. Connect to the database
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
}

// 4. POST handler
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Generate role dynamically based on email ending
    const assignedRole = email.endsWith("@admin.com") ? "admin" : "user";

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Update role if it's different
      if (existingUser.role !== assignedRole) {
        existingUser.role = assignedRole;
        await existingUser.save();
      }

      return NextResponse.json(
        {
          message: "User already exists",
          userId: existingUser._id.toString(),
          role: existingUser.role,
        },
        { status: 200 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: assignedRole,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: newUser._id.toString(),
        role: newUser.role,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
