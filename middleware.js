import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.rewrite(new URL("/401", req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (e) {
    return NextResponse.rewrite(new URL("/401", req.url));
  }
}

export const config = {
  matcher: ["/account", "/wishlist", "/cart", "/contact"],
};
