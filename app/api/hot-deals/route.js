import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "../../models/Products";

export async function GET() {
  try {
    await connectDB();

    // 🔹 رجع المنتجات يلي عليها hotDeal فقط
    const hotDeals = await Product.find({ hotDeal: true }).sort({ createdAt: -1 });

    return NextResponse.json(hotDeals, { status: 200 });
  } catch (err) {
    console.error("Hot Deals API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
