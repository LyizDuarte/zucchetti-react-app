import { useMemo, useState } from 'react';
import { Alert, Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import type { User } from '../types/User';
import { useUsers } from '../contexts/UsersContext';
import { UserFormDialog } from '../components/UserFormDialog';
import { DeleteUserDialog } from '../components/DeleteUserDialog';

export function UsersPage() {
  const { users, loading, error, deleteUser, loadUsers } = useUsers();
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const filteredAndSortedUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = normalizedSearch
      ? users.filter(user => user.name.toLowerCase().includes(normalizedSearch))
      : users;

    return [...filtered].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) return order === 'asc' ? -1 : 1;
      if (nameA > nameB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, search, order]);

  const handleOpenCreate = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAskDelete = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    await deleteUser(userToDelete.id);
    handleCloseDeleteDialog();
  };

  if (loading) {
    return (
      <Container
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body1" color="text.secondary">
          Carregando usuários...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
        }}
      >
        <Alert severity="error">{error}</Alert>
        <Button variant="outlined" onClick={loadUsers}>
          Tentar novamente
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Painel de Usuários
      </Typography>

      <Container
        disableGutters
        sx={{
          display: 'flex',
          gap: 2,
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        <Button variant="contained" onClick={handleOpenCreate}>
          Novo usuário
        </Button>

        <TextField
          label="Filtrar por nome"
          variant="outlined"
          size="small"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />

        <TextField
          select
          label="Ordenar por nome"
          variant="outlined"
          size="small"
          value={order}
          onChange={event => setOrder(event.target.value as 'asc' | 'desc')}
          SelectProps={{ native: true }}
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </TextField>
      </Container>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary">
                    Nenhum usuário encontrado.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => handleOpenEdit(user)} sx={{ mr: 1 }}>
                      Editar
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleAskDelete(user)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <UserFormDialog open={isDialogOpen} onClose={handleCloseDialog} user={editingUser ?? undefined} />

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        user={userToDelete}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}