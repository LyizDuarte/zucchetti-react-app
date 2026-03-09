import { Button, Container, TextField } from '@mui/material';

type UsersToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  order: 'asc' | 'desc';
  onOrderChange: (value: 'asc' | 'desc') => void;
  onNewUser: () => void;
};

export function UsersToolbar({
  search,
  onSearchChange,
  order,
  onOrderChange,
  onNewUser,
}: UsersToolbarProps) {
  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2,
        flexWrap: 'wrap',
      }}
    >
      <Button variant="contained" onClick={onNewUser}>
        Novo usuário
      </Button>
      <TextField
        id="filter-by-name"
        label="Filtrar por nome"
        variant="outlined"
        size="small"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
      <TextField
        id="sort-by-name"
        select
        label="Ordenar por nome"
        variant="outlined"
        size="small"
        value={order}
        onChange={e => onOrderChange(e.target.value as 'asc' | 'desc')}
        SelectProps={{ native: true }}
      >
        <option value="asc">A → Z</option>
        <option value="desc">Z → A</option>
      </TextField>
    </Container>
  );
}
