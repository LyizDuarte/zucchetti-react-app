import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { User } from '../types/User';

type DeleteUserDialogProps = {
  open: boolean;
  user: User | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteUserDialog({ open, user, onCancel, onConfirm }: DeleteUserDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirmar exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir o usuário <strong>{user?.name}</strong>? Esta ação não
          poderá ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

