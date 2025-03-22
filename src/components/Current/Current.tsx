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
import React, { useState } from "react";
import Column from "../Column/Column";
import Input from "../Input/Input";
import { Task } from "@/types";

const Current = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Hello this is a first comment" },
    { id: 2, title: "Hello there, this is from second comment" },
    { id: 3, title: "Finally, good bye" },
  ]);

  const addTask = (title: string) => {
    setTasks([...tasks, { id: tasks.length + 1, title }]);
  };

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

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <Input onSubmit={addTask} />
      <Column tasks={tasks} />
    </DndContext>
  );
};

export default Current;
