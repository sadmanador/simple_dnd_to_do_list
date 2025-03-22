import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true }, // Adjust this based on your actual schema
  createdAt: { type: Date, },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
