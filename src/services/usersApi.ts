import type { User, UserStatus } from '../types/User';

export async function fetchUsersApi(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Erro ao buscar usuários');
  }

  return data.map((u: any) => {
    const status: UserStatus = u.status ?? (u.id % 2 === 0 ? 'active' : 'inactive');

    return {
      id: u.id,
      name: u.name,
      email: u.email,
      status,
    };
  });
}