import { Box, IconButton, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import type { ThemeMode } from '../../contexts/ThemeContext';
import zucchettiLogo from '../../assets/logo.png';

type UsersPageHeaderProps = {
  mode: ThemeMode;
  onToggleTheme: () => void;
};

export function UsersPageHeader({ mode, onToggleTheme }: UsersPageHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <img
          src={zucchettiLogo}
          alt="Zucchetti"
          style={{ height: 40, objectFit: 'contain' }}
        />
        <Typography variant="h4" component="h1">
          Painel de Usuários
        </Typography>
      </Box>
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
