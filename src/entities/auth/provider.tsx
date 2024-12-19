import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from './context';
import { IAuthContextValue } from './types';
import { useMutation } from '@tanstack/react-query';
import { authApi } from './api';
import { TUserCredits } from '../user/types';
import { appRoutes } from '../../shared/routes';
import { useLocation, useNavigate } from 'react-router';

interface IProps {
  children: ReactNode;
  onStatusChange: (isAuth: boolean) => void;
}

const nonProtectedRoutes = [appRoutes.home, appRoutes.syllabuses];

export function AuthContextProvider({ children, onStatusChange }: IProps) {
  const [user, setUser] = useState<IAuthContextValue['user']>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { mutate: authQuery } = useMutation({
    mutationFn: authApi.authenticate,
    mutationKey: ['authenticate'],
    onSuccess: ({ data }) => setUser(data),
  });

  const { mutate: loginQuery, isPending: loginPending } = useMutation({
    mutationFn: authApi.login,
    mutationKey: ['login'],
    onSuccess: ({ data }) => {
      setUser(data);
    },
  });

  const { mutate: logoutQuery, isPending: logoutPending } = useMutation({
    mutationFn: authApi.logout,
    mutationKey: ['logout'],
    onSuccess: () => setUser(null),
  });

  const auth = useCallback(authQuery, [authQuery]);

  const login = useCallback(
    (credits: TUserCredits) => {
      loginQuery(credits);
    },
    [loginQuery],
  );

  const logout = useCallback(logoutQuery, [logoutQuery]);

  useEffect(() => {
    !user && auth();
  }, [user, auth]);

  useEffect(() => onStatusChange(!!user), [user, onStatusChange]);

  useEffect(() => {
    if (
      !nonProtectedRoutes.includes(pathname as (typeof nonProtectedRoutes)[number]) &&
      !user
    ) {
      navigate(appRoutes.home);
    }
  }, [navigate, auth, pathname, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: { fn: login, isPending: loginPending },
        logout: { fn: logout, isPending: logoutPending },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
