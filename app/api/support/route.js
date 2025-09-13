import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Support from "../../models/Support";

export async function POST(req) {
  try {
    const data = await req.json();
    await connect();

    const support = new Support(data);
    await support.save();

    return NextResponse.json({
      message: "✅ Support message saved successfully in MongoDB!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
