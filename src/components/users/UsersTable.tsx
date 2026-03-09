import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { User } from '../../types/User';

type UsersTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Lista de usuários">
        <TableHead>
          <TableRow>
            <TableCell scope="col">Nome</TableCell>
            <TableCell scope="col">E-mail</TableCell>
            <TableCell scope="col">Status</TableCell>
            <TableCell scope="col" align="right">
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body2" color="text.secondary">
                  Nenhum usuário encontrado.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    onClick={() => onEdit(user)}
                    sx={{ mr: 1 }}
                    aria-label={`Editar usuário ${user.name}`}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => onDelete(user)}
                    aria-label={`Excluir usuário ${user.name}`}
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
  );
}
