import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Suspense, useMemo } from 'react';
import { useThemeMode } from './contexts/ThemeContext';
import { getAppTheme } from './theme/appTheme';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { PageFallback } from './components/shared/PageFallback';
import { LazyUsersPage } from './routes/lazyPages';

function App() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Suspense fallback={<PageFallback />}>
          <LazyUsersPage />
        </Suspense>
      </ErrorBoundary>
    </MuiThemeProvider>
  );
}

export default App;
