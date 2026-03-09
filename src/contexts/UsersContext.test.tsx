import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { UsersProvider, useUsers } from './UsersContext';

jest.mock('../services/users', () => ({
  fetchUsersApi: jest.fn().mockResolvedValue([]),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <UsersProvider>{children}</UsersProvider>
      </QueryClientProvider>
    );
  };
}

describe('UsersContext', () => {
  function renderUsersHook() {
    return renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });
  }

  it('adiciona um novo usuário com createUser', async () => {
    const { result } = renderUsersHook();

    await waitFor(() => {
      expect(result.current.users).toEqual([]);
    });

    await act(async () => {
      await result.current.createUser({
        name: 'Novo Usuário',
        email: 'novo@example.com',
        status: 'active',
      });
    });

    await waitFor(() => {
      expect(result.current.users.some(u => u.name === 'Novo Usuário')).toBe(true);
    });
  });

  it('atualiza um usuário com updateUser', async () => {
    const { result } = renderUsersHook();

    await waitFor(() => {
      expect(result.current.users).toEqual([]);
    });

    await act(async () => {
      await result.current.createUser({
        name: 'Para Atualizar',
        email: 'atualizar@example.com',
        status: 'inactive',
      });
    });

    await waitFor(() => {
      expect(result.current.users.some(u => u.name === 'Para Atualizar')).toBe(true);
    });

    const createdId: number | undefined = result.current.users.find(
      u => u.name === 'Para Atualizar',
    )?.id;
    expect(createdId).toBeDefined();

    await act(async () => {
      await result.current.updateUser({
        id: createdId!,
        name: 'Atualizado',
        email: 'atualizado@example.com',
        status: 'active',
      });
    });

    await waitFor(() => {
      const updated = result.current.users.find(u => u.id === createdId);
      expect(updated?.name).toBe('Atualizado');
      expect(updated?.status).toBe('active');
    });
  });

  it('remove um usuário com deleteUser', async () => {
    const { result } = renderUsersHook();

    await waitFor(() => {
      expect(result.current.users).toEqual([]);
    });

    await act(async () => {
      await result.current.createUser({
        name: 'Para Deletar',
        email: 'deletar@example.com',
        status: 'inactive',
      });
    });

    await waitFor(() => {
      expect(result.current.users.some(u => u.name === 'Para Deletar')).toBe(true);
    });

    const createdId: number | undefined = result.current.users.find(
      u => u.name === 'Para Deletar',
    )?.id;
    expect(createdId).toBeDefined();

    await act(async () => {
      await result.current.deleteUser(createdId!);
    });

    await waitFor(() => {
      expect(result.current.users.find(u => u.id === createdId)).toBeUndefined();
    });
  });
});

