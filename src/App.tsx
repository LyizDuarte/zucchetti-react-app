import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { useThemeMode } from './contexts/ThemeContext';
import { getAppTheme } from './theme/appTheme';
import { ErrorBoundary } from './components/ErrorBoundary';
import { UsersPage } from './pages/UsersPage';

function App() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <UsersPage />
      </ErrorBoundary>
    </MuiThemeProvider>
  );
}

export default App;
