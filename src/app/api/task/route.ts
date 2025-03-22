import { NextResponse } from "next/server";
import connectionToDB from "../../../../lib/mongoose";
import Task from "../../../../models/Task";

export  async function POST(request: Request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB Connected!");

    const task = await request.json();
    if (!task.input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    const newTask = new Task(task);
    console.log("Saving task:", task);
    await newTask.save();

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in POST request:", error);
      return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    } else {
      console.error("Error in POST request:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}

