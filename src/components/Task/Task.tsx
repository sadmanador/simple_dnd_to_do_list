import { TaskProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task: React.FC<TaskProps> = ({ id, title }) => {
  const { attributes, transform, listeners, setNodeRef, transition } =
    useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white rounded-sm shadow-md w-full p-5 flex items-center justify-items-start gap-5 touch-none"
      style={style}
    >
      <input type="checkbox" className="h-5 w-5" />
      {title}
    </div>
  );
};

export default Task;
