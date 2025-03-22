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
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Hello this is a first comment" },
    { id: 2, title: "Hello there, this is from second comment" },
    { id: 3, title: "Finally, good bye" },
  ]);

  const addTask = (title: string) => {
    setTasks([...tasks, { id: tasks.length + 1, title }]);
  };

  const getTaskPosition = (id: number) => tasks.findIndex((task) => task.id === id);

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
    <div className="w-full h-full flex flex-col items-center justify-center mt-4  gap-2">
      <h1 className="font-semibold text-2xl">My Tasks</h1>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}
