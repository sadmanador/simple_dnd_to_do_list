import { InputProps } from "@/types";
import React, { useState } from "react";

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) return;

    onSubmit(input);
    setInput("");
  };

  return (
    <div className="flex gap-2.5">
      <input
        type="text"
        value={input}
        className="border border-gray-300 p-2.5 rounded-sm"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
      className="outline-none bg-blue-500 text-white px-4 py-2 rounded-sm"
      onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default Input;
