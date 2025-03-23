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
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Column from "../Column/Column";
import { Task } from "@/types";

const Completed = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data: session } = useSession();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchData = async () => {
   

    try {
      if (!session || !session.user) {
        console.error("Session or user is not available");
        return;
      }
      const response = await axios.get(`/api/completed?user=${session.user.email}`);

      const sortedTasks = response.data.map((task: Task) => ({
        _id: task._id,
        id: task.id,
        title: task.title,
        task: task.task,
        createdAt: task.createdAt,
      })).sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setTasks(sortedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error: ${err.response.data.error}`);
      } else {
        alert("Unknown error");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  const getTaskPosition = (id: string) =>
    tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const originPos = getTaskPosition(active.id as string);
    const newPos = getTaskPosition(over.id as string);

    if (originPos !== newPos) {
      setTasks((prevTasks) => arrayMove(prevTasks, originPos, newPos));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <Column tasks={tasks} />
    </DndContext>
  );
};

export default Completed;
