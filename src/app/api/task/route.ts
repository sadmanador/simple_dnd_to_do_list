import { NextResponse } from "next/server";
import connectionToDB from "../../../../lib/mongoose";
import Task from "../../../../models/Task";

export async function POST(request: Request) {
  try {
    await connectionToDB(); // Ensure the DB connection is established

    const taskData = await request.json();

    // Check if task data is valid
    if (!taskData.task) {
      return NextResponse.json(
        { error: "Task input is required" },
        { status: 400 }
      );
    }

    // Ensure user exists in session data
    if (!taskData.user) {
      return NextResponse.json(
        { error: "User data is required" },
        { status: 400 }
      );
    }

    const newTask = new Task({
      user: taskData.user,
      task: taskData.task,
      status: taskData.status || "CURRENT",
    });

    console.log("Saving task:", taskData);

    await newTask.save(); // Save the task to DB

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB Connected!");

    // Extract the user email from query params (assuming it is passed as a query)
    const url = new URL(request.url);
    const userEmail = url.searchParams.get("user");

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Fetch tasks for the specified user with status "CURRENT"
    const tasks = await Task.find({
      user: userEmail,
      status: "CURRENT",
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB Connected!");

    const { id, task } = await request.json();
    if (!id || !task) {
      return NextResponse.json(
        { error: "ID and task content are required" },
        { status: 400 }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB Connected!");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connectionToDB();

    const { id } = await request.json();
    if (!id)
      return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const task = await Task.findById(id);
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });

    task.status = task.status === "CURRENT" ? "COMPLETED" : "CURRENT";
    await task.save();

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}
