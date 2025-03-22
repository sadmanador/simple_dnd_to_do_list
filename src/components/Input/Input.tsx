import { InputProps } from "@/types";
import axios from "axios";
import React, { useState } from "react";

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/task", { task: input }); // Use "task" here
      console.log(response.data);
      onSubmit(input);
      setInput("");
    } catch (err) {
      console.error("Error submitting task:", err);
      alert(`Error: ${err.response ? err.response.data.error : "Unknown error"}`);
    }
  };
  

  return (
    <div className="flex gap-2.5">
      <input
        type="text"
        placeholder="Add a task..."
        className="border border-gray-300 p-2.5 rounded-sm w-full"
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
