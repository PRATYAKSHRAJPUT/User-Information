import { connectdb } from "@/lib/db";
import User from "@/lib/module/login";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  await connectdb();

  const hashedPassword = await bcrypt.hash("123456", 10);
  await User.create({ email: "test@example.com", password: hashedPassword });

  return NextResponse.json({ message: "Test user created: test@example.com / 123456" });
}
