'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskFilters from '@/components/TaskFilters';
import TaskList from '@/components/TaskList';
import Pagination from '@/components/Pagination';
import { Task, User } from '@/types/task';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getMe,
  getGithubLoginUrl,
} from '@/services/api';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  const tasksPerPage = 5;

  async function checkAuth() {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
    }
    setAuthLoading(false);
  }

  async function loadTasks() {
    if (! user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await getTasks(
        statusFilter,
        priorityFilter,
        currentPage,
        tasksPerPage
      );
      setTasks(response.data);
      setTotalPages(Math.ceil(response. total / tasksPerPage));
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, statusFilter, priorityFilter, currentPage]);

  async function handleAddTask(title: string, priority: string) {
    try {
      await createTask(title, priority);
      setCurrentPage(1);
      loadTasks();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  }

  async function handleToggleTask(id: string, completed: boolean) {
    try {
      await updateTask(id, { completed });
      loadTasks();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  }

  async function handleEditTask(id: string, title: string) {
    try {
      await updateTask(id, { title });
      loadTasks();
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  }

  function handleStatusChange(status: string) {
    setStatusFilter(status);
    setCurrentPage(1);
  }

  function handlePriorityChange(priority: string) {
    setPriorityFilter(priority);
    setCurrentPage(1);
  }

  function handleLogout() {
    setUser(null);
    setTasks([]);
  }

  function handleLogin() {
    window.location.href = getGithubLoginUrl();
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {! user ? (
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Bem-vindo ao Painel de Tarefas! 
              </h2>
              <p className="text-gray-600 mb-6">
                Faça login com sua conta do GitHub para começar a gerenciar suas tarefas.
              </p>
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors mx-auto"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3. 435 9.795 8.205 11.385.6.105. 825-.255.825-.57 0-.285-. 015-1.23-.015-2. 235-3.015.555-3. 795-. 735-4.035-1.41-. 135-.345-.72-1.41-1.23-1.695-.42-. 225-1.02-.78-.015-. 795.945-.015 1.62. 87 1.845 1.23 1.08 1.815 2. 805 1.305 3.495. 99.105-.78.42-1. 305.765-1.605-2.67-. 3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-. 3-.54-1.53.12-3.18 0 0 1. 005-.315 3.3 1. 23.96-.27 1.98-. 405 3-. 405s2.04.135 3 .405c2. 295-1.56 3.3-1. 23 3.3-1.23. 66 1.65.24 2. 88.12 3.18.765. 84 1.23 1.905 1.23 3.225 0 4.605-2.805 5. 625-5.475 5.925. 435.375.81 1.095. 81 2.22 0 1. 605-.015 2.895-.015 3.3 0 .315.225.69.825. 57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Entrar com GitHub
              </button>
            </div>
          ) : (
            <>
              <TaskForm onAddTask={handleAddTask} />

              <TaskFilters
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
                onStatusChange={handleStatusChange}
                onPriorityChange={handlePriorityChange}
              />

              {loading ?  (
                <div className="text-center py-12 text-gray-500">
                  Carregando... 
                </div>
              ) : (
                <>
                  <TaskList
                    tasks={tasks}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                  />

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}