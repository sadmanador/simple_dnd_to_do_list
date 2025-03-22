export interface Task {
  id: number;
  title: string;
}

export interface InputProps {
  onSubmit: (title: string) => void;
}

export interface ColumnProps {
  tasks: Task[];
  setSelectedTask: (selectedTask: number[]) => void;
  selectedTask: number[];
}

export interface TaskProps {
  id: number;
  title: string;
  setSelectedTask: (selectedTask: number[]) => void;
  selectedTask: number[];
}
