import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Input = () => {
  const { data: session } = useSession(); // Destructure 'data' directly from session
  const [input, setInput] = useState("");

  console.log("User Info for making task:", session);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in and input is not empty
    if (!session?.user) {
      alert("You must be logged in to add a task.");
      return;
    }
    if (!input.trim()) {
      alert("Task cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("/api/task", {
        user: session.user?.email, // Adjust depending on session structure
        task: input,
        status: "CURRENT",
      });

      console.log(response.data);
      window.location.reload(); 
    } catch (err) {
      console.error("Error submitting task:", err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error: ${err.response.data.error}`);
      } else {
        alert("Unknown error");
      }
    }
  };

  return (
    <div className="flex gap-2.5">
      <input
        type="text"
        placeholder="Add a task..."
        className="border border-gray-300 p-2.5 rounded-sm w-full text-black"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="outline-none bg-blue-500 text-white px-4 py-2 rounded-sm"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default Input;
