import { createTheme } from '@mui/material/styles';
import type { ThemeMode } from '../contexts/ThemeContext';

export function getAppTheme(mode: ThemeMode) {
  return createTheme({
    palette: {
      mode,
    },
  });
}
