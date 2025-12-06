import { User } from '@/types/task';
import UserMenu from './UserMenu';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            📋 Painel de Tarefas
          </h1>
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}