import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/User';
import { fetchUsersApi } from '../services/usersApi';

type UsersContextValue = {
  users: User[];
  loading: boolean;
  error: string | null;
  loadUsers: () => Promise<void>;
  createUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
};

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsersApi();
      setUsers(data);
      setError(null);
    } catch (e) {
      setError('Falha ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (newUser: Omit<User, 'id'>) => {
    setUsers(prev => [...prev, { ...newUser, id: Date.now() }]);
  };

  const updateUser = async (user: User) => {
    setUsers(prev => prev.map(u => (u.id === user.id ? user : u)));
  };

  const deleteUser = async (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{ users, loading, error, loadUsers, createUser, updateUser, deleteUser }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error('useUsers deve ser usado dentro de UsersProvider');
  return ctx;
}