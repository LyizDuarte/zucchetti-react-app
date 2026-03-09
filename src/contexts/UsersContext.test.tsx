import { renderHook, act } from '@testing-library/react';
import { UsersProvider, useUsers } from './UsersContext';

describe('UsersContext', () => {
  function renderUsersHook() {
    return renderHook(() => useUsers(), {
      wrapper: ({ children }) => <UsersProvider>{children}</UsersProvider>,
    });
  }

  it('adiciona um novo usuário com createUser', async () => {
    const { result } = renderUsersHook();

    await act(async () => {
      await result.current.createUser({
        name: 'Novo Usuário',
        email: 'novo@example.com',
        status: 'active',
      });
    });

    expect(result.current.users.some(u => u.name === 'Novo Usuário')).toBe(true);
  });

  it('atualiza um usuário com updateUser', async () => {
    const { result } = renderUsersHook();

    let createdId: number | undefined;

    await act(async () => {
      await result.current.createUser({
        name: 'Para Atualizar',
        email: 'atualizar@example.com',
        status: 'inactive',
      });
    });

    createdId = result.current.users.find(u => u.name === 'Para Atualizar')?.id;
    expect(createdId).toBeDefined();

    await act(async () => {
      await result.current.updateUser({
        id: createdId!,
        name: 'Atualizado',
        email: 'atualizado@example.com',
        status: 'active',
      });
    });

    const updated = result.current.users.find(u => u.id === createdId);
    expect(updated?.name).toBe('Atualizado');
    expect(updated?.status).toBe('active');
  });

  it('remove um usuário com deleteUser', async () => {
    const { result } = renderUsersHook();

    let createdId: number | undefined;

    await act(async () => {
      await result.current.createUser({
        name: 'Para Deletar',
        email: 'deletar@example.com',
        status: 'inactive',
      });
    });

    createdId = result.current.users.find(u => u.name === 'Para Deletar')?.id;
    expect(createdId).toBeDefined();

    await act(async () => {
      await result.current.deleteUser(createdId!);
    });

    expect(result.current.users.find(u => u.id === createdId)).toBeUndefined();
  });
});

