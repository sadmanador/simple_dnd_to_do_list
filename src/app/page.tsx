"use client";


import Column from "@/components/Column/Column";
import Input from "@/components/Input/Input";
import { Task } from "@/types";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React from "react";
import { useEffect, useState } from "react";

// Tabs Component
function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: (index: number) => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <ul className="flex items-center gap-4 text-sm font-medium">
        {["Current", "Completed"].map((label, index) => (
          <li key={index}>
            <button
              onClick={() => setActiveTab(index)}
              className={`inline-flex cursor-pointer items-center gap-2 px-4 py-3 text-gray-600 hover:text-blue-700 ${
                activeTab === index
                  ? "relative text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-700"
                  : ""
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Hello, this is a first comment" },
    { id: 2, title: "Hello there, this is from second comment" },
    { id: 3, title: "Finally, good bye" },
  ]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<number[]>([]);

  console.log(selectedTask);

  useEffect(() => {
    console.log("Active Tab:", activeTab);
  }, [activeTab]);


  const getTaskPosition = (id: number) =>
    tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const originPos = getTaskPosition(active.id as number);
    const newPos = getTaskPosition(over.id as number);

    if (originPos !== newPos) {
      setTasks((tasks) => arrayMove(tasks, originPos, newPos));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-4 gap-4">
      <h1 className="font-semibold text-2xl">My Tasks</h1>
      <div className="w-full max-w-lg">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="py-3">
          {activeTab === 0 ? (
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <Input />
              <Column
                tasks={tasks}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
              />
            </DndContext>
          ) : (
            <div className="p-4 border rounded-lg bg-gray-50">
              <h2 className="text-lg font-semibold">Preferences</h2>
              <label className="block mt-3 text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
              <label className="block mt-3 text-sm font-medium text-gray-700">
                Theme:
              </label>
              <select className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Light</option>
                <option>Dark</option>
              </select>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
