import { lazy } from 'react';

export const LazyUsersPage = lazy(() =>
  import('../pages/UsersPage').then(m => ({ default: m.UsersPage })),
);
