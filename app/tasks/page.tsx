"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/component/taskfrom";
import TaskList from "@/component/tasklist";

export interface Task {
  _id?: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  deadline?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from API
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async (task: Task) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}
