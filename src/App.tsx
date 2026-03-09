import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { useThemeMode } from './contexts/ThemeContext';
import { getAppTheme } from './theme/appTheme';
import { UsersPage } from './pages/UsersPage';

function App() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <UsersPage />
    </MuiThemeProvider>
  );
}

export default App;
