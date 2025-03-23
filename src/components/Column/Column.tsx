import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";
import React from "react";
import { ColumnProps } from "@/types";




const Column: React.FC<ColumnProps> = ({ tasks }) => {

  return (
    <div className="p-8 bg-[#f2f2f3] rounded-sm  flex flex-col gap-3 ">
      <SortableContext items={tasks.map(task => ({ id: task._id }))} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task._id} id={task._id} title={task.task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
