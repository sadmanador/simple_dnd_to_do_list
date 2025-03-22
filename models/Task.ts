import { Schema, model, models } from 'mongoose';

// Define the schema
const taskSchema = new Schema(
  {
    input: {
      type: String,
      required: [true, 'Input is required'],
    },
  },
  { timestamps: true }
);

// Ensure the model isn't redefined
const Task = models.Task || model('Task', taskSchema);

export default Task;
