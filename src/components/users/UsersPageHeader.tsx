import { Box, IconButton, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import type { ThemeMode } from '../../contexts/ThemeContext';

type UsersPageHeaderProps = {
  mode: ThemeMode;
  onToggleTheme: () => void;
};

export function UsersPageHeader({ mode, onToggleTheme }: UsersPageHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="h4" component="h1">
        Painel de Usuários
      </Typography>
      <IconButton
        onClick={onToggleTheme}
        color="inherit"
        aria-label={mode === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
        title={mode === 'dark' ? 'Tema claro' : 'Tema escuro'}
      >
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
