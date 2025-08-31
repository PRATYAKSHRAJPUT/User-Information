import { NextResponse } from "next/server";
import Task from "@/lib/module/task";
import { connectdb } from "@/lib/db";

// 🟢 GET (Fetch All Tasks)
export async function GET() {
  await connectdb();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

// 🟡 POST (Create New Task)
export async function POST(req: Request) {
  await connectdb();
  const body = await req.json();
  const newTask = await Task.create(body);
  return NextResponse.json(newTask, { status: 201 });
}

// 🔴 DELETE (Delete Task by ID)
export async function DELETE(req: Request) {
  await connectdb();
  const { id } = await req.json();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" });
}

// 🔵 PUT (Update Task by ID)
export async function PUT(req: Request) {
  await connectdb();
  const { id, ...data } = await req.json();
  const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updatedTask);
}
