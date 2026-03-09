import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { User } from '../types/User';
import { useUsers } from '../contexts/UsersContext';
import { userFormSchema, type UserFormInputs } from '../schemas/userFormSchema';

type UserFormDialogProps = {
  open: boolean;
  onClose: () => void;
  user?: User;
};

export function UserFormDialog({ open, onClose, user }: UserFormDialogProps) {
  const isEditMode = Boolean(user);
  const { createUser, updateUser } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormInputs>({
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        status: user.status,
      });
    } else {
      reset({
        name: '',
        email: '',
        status: 'active',
      });
    }
  }, [user, reset, open]);

  const onSubmit = async (data: UserFormInputs) => {
    if (isEditMode && user) {
      await updateUser({ ...user, ...data });
    } else {
      await createUser(data);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? 'Editar usuário' : 'Novo usuário'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome"
            fullWidth
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <TextField
            label="E-mail"
            fullWidth
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <TextField
            label="Status"
            select
            fullWidth
            defaultValue="active"
            {...register('status')}
            error={Boolean(errors.status)}
            helperText={errors.status?.message}
          >
            <MenuItem value="active">Ativo</MenuItem>
            <MenuItem value="inactive">Inativo</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isEditMode ? 'Salvar alterações' : 'Criar usuário'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

