import { Task } from '@/types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  function sortByPriority(tasks: Task[]) {
    const priorityOrder: Record<string, number> = {
      urgente: 1,
      alta: 2,
      media: 3,
      baixa: 4,
    };

    return [... tasks].sort((a, b) => {
      return (priorityOrder[a. priority] || 5) - (priorityOrder[b.priority] || 5);
    });
  }

  const sortedTasks = sortByPriority(tasks);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">Nenhuma tarefa encontrada</p>
        <p className="mt-2">Adicione uma nova tarefa acima! </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task. id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}