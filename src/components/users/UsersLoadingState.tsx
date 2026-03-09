import { CircularProgress, Container, Typography } from '@mui/material';

export function UsersLoadingState() {
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
      <CircularProgress />
      <Typography variant="body1" color="text.secondary">
        Carregando usuários...
      </Typography>
    </Container>
  );
}
