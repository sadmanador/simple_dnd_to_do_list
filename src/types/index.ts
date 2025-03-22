export interface Task {
  id: number;
  title: string;
}

export interface InputProps {
  onSubmit: (title: string) => void;
}

export interface ColumnProps {
  tasks: Task[];
}

export interface TaskProps {
  id: number;
  title: string;
}
