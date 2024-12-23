import { useEffect, useMemo, useState } from 'react';
import { Button, Space } from 'antd';
import { appRoutes } from './routes';
import { TSetParamsFn, TTableActions } from './types';
import { Pencil, Printer, Trash } from 'lucide-react';
import { Role } from './roles';
import { useAuth } from '../entities/auth/lib';

export function useLog(...args: any[]) {
  useEffect(() => {
    console.log(...args);
  }, [args]);
}

type TRoleLike = Role | keyof typeof Role;

export function useRights(needRole: TRoleLike | undefined | null) {
  const [result, setResult] = useState(false);
  const { user } = useAuth();

  const userRole = useMemo(() => {
    return user?.role;
  }, [user]);

  useEffect(() => {
    if (!userRole) {
      setResult(() => false);
      return;
    }

    const roleItem = (roleLike: TRoleLike | null | undefined) =>
      typeof roleLike === 'string' ? Role[roleLike as keyof typeof Role] : roleLike;

    const userRoleItem = roleItem(userRole);
    if (userRoleItem === Role.Admin) {
      setResult(() => true);
      return;
    }

    setResult(() => userRoleItem === roleItem(needRole));
  }, [userRole, needRole]);

  return result;
}

export function renderLink(
  id: any,
  setParams: TSetParamsFn,
  registry?: keyof typeof appRoutes,
  name?: string,
) {
  return (
    <Button
      type={'link'}
      onClick={() =>
        setParams(registry ? { id, from: registry.replace('/', '') } : { id })
      }
    >
      {name ?? id}
    </Button>
  );
}

export function renderActions({
  canChange,
  actions,
  onDelete,
  onEdit,
  onPrint,
}: {
  canChange: boolean;
  actions: TTableActions;
  onEdit: () => void;
  onPrint: () => void;
  onDelete: () => void;
}) {
  return (
    <Space>
      {actions.includes('delete') && canChange && (
        <Button type={'text'} onClick={onDelete}>
          <Trash color={'red'} />
        </Button>
      )}
      {actions.includes('edit') && canChange && (
        <Button type={'text'} onClick={onEdit}>
          <Pencil />
        </Button>
      )}
      {actions.includes('print') && (
        <Button type={'text'} onClick={onPrint}>
          <Printer />
        </Button>
      )}
    </Space>
  );
}
