// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully" });

  // Remove the token cookie
  res.cookies.set("token", "", {
    path: "/",
    httpOnly: true, // same as when set
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // expire immediately
    sameSite: "strict",
  });

  return res;
}
