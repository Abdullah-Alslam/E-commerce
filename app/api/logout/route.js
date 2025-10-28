import { NextResponse } from "next/server";
import Cookie from "cookie-universal";

export async function POST() {
  const cookie = Cookie();
  
  cookie.remove("token", { path: "/" });

  return NextResponse.json({ message: "Logged out successfully" });
}
