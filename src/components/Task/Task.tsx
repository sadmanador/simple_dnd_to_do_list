import { TaskProps } from "@/types";
import { IoCheckmarkSharp, IoPencilSharp, IoTrashSharp } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Task: React.FC<TaskProps> = ({ id, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  // Reference to the input field
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus and select the input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Select the content inside the input field
    }
  }, [isEditing]); // Trigger effect when isEditing changes

  const toggleStatus = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.patch("/api/task", { id });

      if (response.status === 200) {
        console.log("Task status updated:", response.data.status);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDone = async () => {
    if (!newTitle.trim()) return;

    try {
      await axios.put("/api/task", { id, task: newTitle }); // PUT request to update the task title
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`/api/task?id=${id}`); // Use query param instead of body
      window.location.reload();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-white rounded-sm shadow-md w-full p-5 flex items-start justify-between gap-5 touch-none">
      <button
        onClick={toggleStatus}
        className={`btn btn-success text-xl ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        <IoCheckmarkSharp />
      </button>

      <div className="text-gray-800 flex-1">
        {isEditing ? (
          <input
            ref={inputRef} // Attach the ref to the input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="input input-bordered w-full bg-white"
            onKeyDown={(e) => e.key === "Enter" && handleDone()}
          />
        ) : (
          <span className="block whitespace-pre-wrap break-words">{title}</span>
        )}
      </div>

      <button
        onClick={isEditing ? handleDone : handleEdit}
        className={`btn ${isEditing ? "btn-success" : "btn-warning"} text-xl`}
      >
        {isEditing ? (
          <IoCheckmarkSharp />
        ) : (
          <IoPencilSharp />
        )}
      </button>

      <button onClick={handleDelete} className="btn btn-error text-xl">
        <IoTrashSharp />
      </button>
    </div>
  );
};

export default Task;
