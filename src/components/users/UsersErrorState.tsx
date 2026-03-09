import { Alert, Button, Container } from '@mui/material';

type UsersErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function UsersErrorState({ message, onRetry }: UsersErrorStateProps) {
  return (
    <Container
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 2,
      }}
    >
      <Alert severity="error">{message}</Alert>
      <Button variant="outlined" onClick={onRetry}>
        Tentar novamente
      </Button>
    </Container>
  );
}
