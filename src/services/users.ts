import type { User, UserStatus } from '../types/User';
import { api } from './api';

type JsonPlaceholderUser = {
  id: number;
  name: string;
  email: string;
  status?: string;
};

function mapToUser(u: JsonPlaceholderUser): User {
  const status: UserStatus =
    u.status === 'active' || u.status === 'inactive' ? u.status : u.id % 2 === 0 ? 'active' : 'inactive';
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    status,
  };
}

export async function fetchUsersApi(): Promise<User[]> {
  const { data } = await api.get<JsonPlaceholderUser[]>('/users');
  return data.map(mapToUser);
}
