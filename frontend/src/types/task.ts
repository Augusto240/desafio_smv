export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  data: Task[];
  total: number;
  page: number;
  limit: number;
}