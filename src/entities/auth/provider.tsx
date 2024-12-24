import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from './context';
import { IAuthContextValue } from './types';
import { useMutation } from '@tanstack/react-query';
import { authApi } from './api';
import { TUserCredits } from '../user/types';
import { appRoutes } from '../../shared/routes';
import { useLocation, useNavigate } from 'react-router';
import { appMessages } from '../../shared/messages';
import { useMessage } from '../message/lib';
import { ERole } from '../../shared/roles';

interface IProps {
  children: ReactNode;
  onStatusChange: (isAuth: boolean) => void;
}

const nonProtectedRoutes = [appRoutes.home, appRoutes.syllabuses];

export function AuthContextProvider({ children, onStatusChange }: IProps) {
  const [user, setUser] = useState<IAuthContextValue['user']>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const message = useMessage();

  const { mutate: authQuery } = useMutation({
    mutationFn: authApi.authenticate,
    mutationKey: ['authenticate'],
    onSuccess: ({ data }) => {
      /*message.success(appMessages.auth.authenticate.success);*/
      setUser(data.data);
    },
    onError: () => {
      /*void message.error(appMessages.auth.authenticate.fail);*/
    },
  });

  const { mutate: loginQuery, isPending: loginPending } = useMutation({
    mutationFn: authApi.login,
    mutationKey: ['login'],
    onSuccess: ({ data }) => {
      setUser(data.data.user);
      message.success(appMessages.auth.login.success);
    },
    onError: () => {
      message.error(appMessages.auth.login.fail);
    },
  });

  const { mutate: logoutQuery, isPending: logoutPending } = useMutation({
    mutationFn: authApi.logout,
    mutationKey: ['logout'],
    onSuccess: () => {
      setUser(null);
      message.success(appMessages.auth.logout.success);
    },
    onError: () => {
      message.error(appMessages.auth.logout.fail);
    },
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
    auth();
  }, [auth]);

  useEffect(
    () => onStatusChange(!!user && user.role !== ERole.User),
    [user, onStatusChange],
  );

  useEffect(() => {
    if (!nonProtectedRoutes.find((route) => route === pathname) && !user) {
      navigate(appRoutes.home);
    }
  }, [navigate, pathname, user]);

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
