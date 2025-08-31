"use client";
import { useState } from "react";
import { ITask } from "@/lib/module/task";

interface TaskFormValues {
  title: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

export default function TaskForm({ onAdd }: { onAdd: (task: TaskFormValues) => void }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onAdd({ title, priority, completed: false });
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex gap-3 items-center bg-white p-4 shadow rounded-lg"
    >
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-1/2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
        className="border p-2 rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
}
