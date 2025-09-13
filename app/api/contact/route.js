import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Contact from "../../models/Contact";

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    await connect();

    const contact = new Contact({
      ...data,
      createdAt: new Date(),
    });

    await contact.save();

    return NextResponse.json({
      message: "Data has been successfully saved in MongoDB! ✅",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
