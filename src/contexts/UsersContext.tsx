/* eslint-disable react-refresh/only-export-components */
import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { createContext, useContext, type ReactNode } from 'react';
import type { User } from '../types/User';
import { fetchUsersApi } from '../services/users';

export const usersQueryKey = ['users'] as const;

type UsersContextValue = {
  users: User[];
  loading: boolean;
  error: string | null;
  loadUsers: () => Promise<unknown>;
  createUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
};

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

function useCreateUser(): UseMutationResult<void, Error, Omit<User, 'id'>> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser: Omit<User, 'id'>) => {
      queryClient.setQueryData<User[]>(usersQueryKey, prev => [
        ...(prev ?? []),
        { ...newUser, id: Date.now() },
      ]);
    },
  });
}

function useUpdateUser(): UseMutationResult<void, Error, User> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      queryClient.setQueryData<User[]>(usersQueryKey, prev =>
        (prev ?? []).map(u => (u.id === user.id ? user : u)),
      );
    },
  });
}

function useDeleteUser(): UseMutationResult<void, Error, number> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      queryClient.setQueryData<User[]>(usersQueryKey, prev =>
        (prev ?? []).filter(u => u.id !== id),
      );
    },
  });
}

export function UsersProvider({ children }: { children: ReactNode }) {
  const {
    data: users = [],
    isLoading: loading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: usersQueryKey,
    queryFn: fetchUsersApi,
  });

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const error = queryError ? (queryError as Error).message : null;

  const createUser = async (newUser: Omit<User, 'id'>) => {
    await createMutation.mutateAsync(newUser);
  };

  const updateUser = async (user: User) => {
    await updateMutation.mutateAsync(user);
  };

  const deleteUser = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        error,
        loadUsers: () => refetch(),
        createUser,
        updateUser,
        deleteUser,
      }}
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
