import { useState } from 'react';
import { Container } from '@mui/material';
import type { User } from '../types/User';
import { useThemeMode } from '../contexts/ThemeContext';
import { useUsers } from '../contexts/UsersContext';
import { useFilteredUsers } from '../hooks/useFilteredUsers';
import {
  DeleteUserDialog,
  UserFormDialog,
  UsersErrorState,
  UsersLoadingState,
  UsersPageHeader,
  UsersTable,
  UsersToolbar,
} from '../components/users';

export function UsersPage() {
  const { mode, toggleTheme } = useThemeMode();
  const { users, loading, error, deleteUser, loadUsers } = useUsers();
  const { search, setSearch, order, setOrder, filteredAndSortedUsers } = useFilteredUsers(users);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  if (loading) return <UsersLoadingState />;
  if (error) return <UsersErrorState message={error} onRetry={loadUsers} />;

  return (
    <Container sx={{ mt: 4 }}>
      <UsersPageHeader mode={mode} onToggleTheme={toggleTheme} />
      <UsersToolbar
        search={search}
        onSearchChange={setSearch}
        order={order}
        onOrderChange={setOrder}
        onNewUser={() => { setEditingUser(null); setIsDialogOpen(true); }}
      />
      <UsersTable
        users={filteredAndSortedUsers}
        onEdit={user => { setEditingUser(user); setIsDialogOpen(true); }}
        onDelete={user => { setUserToDelete(user); setIsDeleteDialogOpen(true); }}
      />
      <UserFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={editingUser ?? undefined}
      />
      <DeleteUserDialog
        open={isDeleteDialogOpen}
        user={userToDelete}
        onCancel={() => { setIsDeleteDialogOpen(false); setUserToDelete(null); }}
        onConfirm={async () => {
          if (userToDelete) {
            await deleteUser(userToDelete.id);
            setIsDeleteDialogOpen(false);
            setUserToDelete(null);
          }
        }}
      />
    </Container>
  );
}
