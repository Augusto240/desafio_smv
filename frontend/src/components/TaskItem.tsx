import { useState } from 'react';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task. title);

  function getPriorityIcon(priority: string) {
    switch (priority) {
      case 'urgente': return '⚡';
      case 'alta': return '🔴';
      case 'media': return '🟡';
      case 'baixa': return '🟢';
      default: return '🟡';
    }
  }

  function getPriorityClass(priority: string) {
    switch (priority) {
      case 'urgente': return 'border-l-purple-500';
      case 'alta': return 'border-l-red-500';
      case 'media': return 'border-l-yellow-500';
      case 'baixa': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  }

  function handleSave() {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle);
    }
    setIsEditing(false);
  }

  function handleKeyDown(e: React. KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSave();
    }
  }

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${getPriorityClass(task.priority)} ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task. id, !task. completed)}
          className="w-5 h-5 cursor-pointer"
        />
        
        <span className="text-xl">{getPriorityIcon(task.priority)}</span>
        
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <span
            className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            {task. title}
          </span>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Editar
          </button>
          
          {! task.completed && (
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Remover
            </button>
          )}
        </div>
      </div>
    </div>
  );
}