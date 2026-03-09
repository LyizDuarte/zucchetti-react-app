import { User } from '../types/User';

export async function fetchUsersApi(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return data.map((u: User) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        status: u.status as UserStatus,
    }));
}