import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Contact from "../../models/Contact";

export async function POST(req) {
  try {
    const data = await req.json();
    await connect();

    const contact = new Contact(data);
    await contact.save();

    return NextResponse.json({
      message: "“Data has been successfully saved in MongoDB!” ✅  ",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
 }
