import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";

import User from "../../../models/User";
import cookie from "cookie";

export async function GET(req) {
  try {
    const cookies = req.headers.get("cookie");
    if (!cookies) {
      return NextResponse.json({ error: "No cookies found" }, { status: 401 });
    }

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;
    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("❌ Error in /api/users/me:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
