"use client";
import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported

const Input = () => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    try {
      console.log("Input data:", input);
      const response = await axios.post("/api/tasks", { task: input });
      console.log("Response:", response);
    } catch (error) {
      console.error("Axios error:", error);
    }
    e.preventDefault();
  };


  return (
    <form onSubmit={handleSubmit} className="flex gap-2.5 my-2">
      <input
        type="text"
        placeholder="Add a task"
        className="border border-gray-300 p-2.5 rounded-sm w-full"
        onChange={(e) => setInput(e.target.value)}
        value={input} // This makes the input controlled
      />
      <input type="submit" value="Add" className="btn btn-primary" />
    </form>
  );
};

export default Input;
