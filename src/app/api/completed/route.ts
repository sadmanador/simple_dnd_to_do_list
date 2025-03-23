import { NextResponse } from "next/server";
import connectionToDB from "../../../../lib/mongoose";
import Task from "../../../../models/Task";

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
      status: "COMPLETED",
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