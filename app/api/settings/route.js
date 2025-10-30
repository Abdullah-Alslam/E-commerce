import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Setting from "../../models/Setting";

// ✅ GET - Fetch settings
export async function GET() {
  try {
    await connectToDatabase();

    const settings = await Setting.findOne();

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

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({
        storeName: body.storeName || "GameZone eCommerce",
        about: body.about || "",
      });
    } else {
      settings.storeName = body.storeName || settings.storeName;
      settings.about = body.about || settings.about;
      await settings.save();
    }

    return NextResponse.json(settings);
  } catch (err) {
    console.error("PUT /api/settings error:", err);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
