import { connectdb } from "@/lib/db";
import User from "@/lib/module/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectdb();
    const data = await req.json();
    console.log(data.name, data.email, data.age, data.role);
    const user = await User.create(
        {
            name: data.name,
            email: data.email,
            age: data.age,
            role: data.role,
        }
    );
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
