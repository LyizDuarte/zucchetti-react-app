import { useUsers } from '../context/UsersContext';

export function UsersPage() {
  const { users, loading, error } = useUsers();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Painel de Usuários</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}