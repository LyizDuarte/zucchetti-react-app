import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { User } from '../../types/User';

type DeleteUserDialogProps = {
  open: boolean;
  user: User | null;
  onCancel: () => void;
  onConfirm: () => void;
};

const DELETE_DIALOG_TITLE_ID = 'delete-user-dialog-title';
const DELETE_DIALOG_DESC_ID = 'delete-user-dialog-description';

export function DeleteUserDialog({ open, user, onCancel, onConfirm }: DeleteUserDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby={DELETE_DIALOG_TITLE_ID}
      aria-describedby={DELETE_DIALOG_DESC_ID}
    >
      <DialogTitle id={DELETE_DIALOG_TITLE_ID} component="h2">
        Confirmar exclusão
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={DELETE_DIALOG_DESC_ID}>
          Tem certeza que deseja excluir o usuário <strong>{user?.name}</strong>? Esta ação não
          poderá ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} autoFocus>
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
