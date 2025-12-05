import { Task, TasksResponse } from '@/types/task';

const API_URL = 'http://localhost:3001';

export async function getTasks(
  status?: string,
  priority?: string,
  page?: number,
  limit?: number
): Promise<TasksResponse> {
  const params = new URLSearchParams();
  
  if (status) params. append('status', status);
  if (priority) params.append('priority', priority);
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit. toString());

  const response = await fetch(`${API_URL}/tasks? ${params.toString()}`);
  return response.json();
}

export async function createTask(title: string, priority: string): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, priority }),
  });
  return response.json();
}

export async function updateTask(
  id: string,
  data: { title?: string; completed?: boolean; priority?: string }
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON. stringify(data),
  });
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
}