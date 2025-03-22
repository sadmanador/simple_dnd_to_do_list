import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";
import React from "react";
import { ColumnProps } from "@/types";

const Column: React.FC<ColumnProps> = ({ tasks }) => {
  return (
    <div className="p-8 bg-[#f2f2f3] rounded-sm max-w-[500px] flex flex-col gap-3 ">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
