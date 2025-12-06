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

export interface User {
  id: string;
  name: string;
  email: string | null;
  avatar: string | null;
}