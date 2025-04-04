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
import { useEffect, useState } from "react";
import Column from "../Column/Column";
import Input from "../Input/Input";
import { useSession } from "next-auth/react";

const Current = () => {
  const [tasks, setTasks] = useState<{ _id: string; id: string; title: string; task: string }[]>([]);
  const { data: session } = useSession();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchData = async () => {
   

    try {
      if (session && session.user) {
        const response = await axios.get(`/api/task?user=${session.user.email}`);
        console.log(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sortedTasks = response.data.sort((a: any, b: any) => a.position - b.position);
        setTasks(sortedTasks);
      }
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
      <Input />
      <Column tasks={tasks} />
    </DndContext>
  );
};

export default Current;
