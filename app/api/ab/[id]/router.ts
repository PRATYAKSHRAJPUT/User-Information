import { connectdb } from "@/lib/db";
import User from "@/lib/module/user";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectdb();
    const body = await req.json();
    const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });
    return Response.json(updatedUser);
  } catch (error) {
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectdb();
    await User.findByIdAndDelete(params.id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
