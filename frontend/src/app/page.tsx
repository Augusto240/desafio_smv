'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskFilters from '@/components/TaskFilters';
import TaskList from '@/components/TaskList';
import Pagination from '@/components/Pagination';
import { Task } from '@/types/task';
import { getTasks, createTask, updateTask, deleteTask } from '@/services/api';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const tasksPerPage = 5;

  async function loadTasks() {
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
    loadTasks();
  }, [statusFilter, priorityFilter, currentPage]);

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
      console. error('Erro ao atualizar tarefa:', error);
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <TaskForm onAddTask={handleAddTask} />
          
          <TaskFilters
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />
          
          {loading ? (
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
        </div>
      </main>
    </div>
  );
}