import { useMemo, useState } from 'react';
import type { User } from '../types/User';

export function useFilteredUsers(users: User[]) {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = normalizedSearch
      ? users.filter(user => user.name.toLowerCase().includes(normalizedSearch))
      : users;

    return [...filtered].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return order === 'asc' ? -1 : 1;
      if (nameA > nameB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, search, order]);

  return { search, setSearch, order, setOrder, filteredAndSortedUsers };
}
