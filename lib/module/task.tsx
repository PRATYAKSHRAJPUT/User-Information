import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  deadline?: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Low" },
    completed: { type: Boolean, default: false },
    deadline: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Task ||mongoose.model('Task', TaskSchema);
