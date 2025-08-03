import { connectdb } from "@/lib/db";
import User from "@/lib/module/login";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 });
    }

    await connectdb();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "Login successful" }, { status: 201 });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
