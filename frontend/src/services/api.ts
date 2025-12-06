import { Task, TasksResponse, User } from '@/types/task';

const API_URL = 'http://localhost:3001';

function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export async function getTasks(
  status?: string,
  priority?: string,
  page?: number,
  limit?: number
): Promise<TasksResponse> {
  const params = new URLSearchParams();

  if (status) params.append('status', status);
  if (priority) params.append('priority', priority);
  if (page) params. append('page', page.toString());
  if (limit) params.append('limit', limit.toString());

  const response = await fetch(`${API_URL}/tasks?${params.toString()}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Erro ao carregar tarefas');
  }

  return response.json();
}

export async function createTask(title: string, priority: string): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ title, priority }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar tarefa');
  }

  return response.json();
}

export async function updateTask(
  id: string,
  data: { title?: string; completed?: boolean; priority?: string }
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (! response.ok) {
    throw new Error('Erro ao atualizar tarefa');
  }

  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response. ok) {
    throw new Error('Erro ao deletar tarefa');
  }
}

export async function getMe(): Promise<User> {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: getHeaders(),
  });

  if (!response. ok) {
    throw new Error('Não autenticado');
  }

  return response.json();
}

export function getGithubLoginUrl(): string {
  return `${API_URL}/auth/github`;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}