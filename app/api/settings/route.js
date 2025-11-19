import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Setting from "../../models/Setting";

// ✅ GET - Fetch settings
export async function GET() {
  try {
    await connectToDatabase();

    const settings = await Setting.findOne({ storeId: "store-info" });

    if (!settings) {
      return NextResponse.json({
        storeName: "GameZone eCommerce",
        about:
          "GameZone is your go-to store for laptops, gaming gear, and accessories.",
      });
    }

    return NextResponse.json(settings);
  } catch (err) {
    console.error("GET /api/settings error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ PUT - Update settings
export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    console.log("📦 Received PUT body:", body);

    if (!body.storeName || !body.storeName.trim()) {
      return NextResponse.json(
        { error: "storeName is required" },
        { status: 400 }
      );
    }

    const updatedSettings = await Setting.findOneAndUpdate(
      { storeId: "store-info" },
      {
        storeName: body.storeName,
        about: body.about || "",
      },
      { new: true, upsert: true } 
    );

    return NextResponse.json(updatedSettings);
  } catch (err) {
    console.error("❌ PUT /api/settings error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
