import { createContext } from 'react';
import { IAuthContextValue } from './types';

export const AuthContext = createContext<IAuthContextValue>({
  login: { fn: (_) => {}, isPending: false },
  logout: { fn: () => {}, isPending: false },
  user: null,
});
