import React from 'react'; // Ensure React is in scope
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CiCircleRemove, CiEdit } from 'react-icons/ci';
import { TaskProps } from '@/types';

const Task: React.FC<TaskProps> = ({ id, title, }) => {
  const { attributes, transform, listeners, setNodeRef, transition } = useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };



  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white rounded-sm shadow-md w-full p-5 flex items-center justify-between gap-5 touch-none cursor-move text-gray-800"
      style={style}
    >
      <input
        type="checkbox"
        className="checkbox checkbox-secondary h-5 w-5"
      />
      <div>{title}</div>

      <div className="flex gap-2">
        <button className="btn btn-accent text-lg">
          <CiEdit />
        </button>
        <button className="btn btn-error text-lg">
          <CiCircleRemove />
        </button>
      </div>
    </div>
  );
};

export default Task;
