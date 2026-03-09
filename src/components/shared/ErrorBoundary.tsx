import { Alert, Box, Button, Typography } from '@mui/material';
import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  override render() {
    if (this.state.hasError && this.state.error) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
          }}
        >
          <Alert severity="error" sx={{ maxWidth: 480, mb: 2 }}>
            <Typography variant="h6" component="p" gutterBottom>
              Algo deu errado
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ocorreu um erro inesperado. Tente recarregar a página ou voltar mais tarde.
            </Typography>
          </Alert>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
            {this.state.error.message}
          </Typography>
          <Button variant="contained" onClick={this.handleRetry}>
            Tentar novamente
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
