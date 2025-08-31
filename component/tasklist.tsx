"use client";
import { ITask } from "@/lib/module/task";

export default function TaskList({ tasks }: { tasks: ITask[] }) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={String(task._id)}
          className={`flex justify-between items-center p-4 rounded-lg shadow ${
            task.priority === "High"
              ? "bg-red-100"
              : task.priority === "Medium"
              ? "bg-yellow-100"
              : "bg-green-100"
          }`}
        >
          <span className="font-medium">{task.title}</span>
          <span className="text-sm">{task.priority}</span>
        </li>
      ))}
    </ul>
  );
}
