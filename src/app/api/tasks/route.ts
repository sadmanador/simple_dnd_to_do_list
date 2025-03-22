import connectionToDB from "../../../../lib/mongoose";
import Task from "../../../../models/task_model";
import { NextResponse } from "next/server";

export default async function POST(request) {
  try {
    await connectionToDB();
    const task = await request.json();
    const newTask = new Task(task);
    await newTask.save();
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
