export interface Task {
  createdAt?: string;
  title?: string;
  id?: string;
  _id: string;
  task: string;
}

export interface ColumnProps {
  tasks: Task[];
}



export interface TaskProps {
  id: string;
  title: string;
}
