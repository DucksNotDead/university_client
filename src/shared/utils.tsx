import { useEffect, useMemo, useState } from 'react';
import { Button, Space, theme, Typography } from 'antd';
import { appRoutes } from './routes';
import { TSetParamsFn, TTableActions } from './types';
import { Pencil, Printer, Trash, UserRoundCheck } from 'lucide-react';
import { ERole } from './roles';
import { useAuth } from '../entities/auth/lib';

export function useLog(...args: any[]) {
  useEffect(() => {
    console.log(...args);
  }, [args]);
}

type TRoleLike = ERole | keyof typeof ERole;

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
      typeof roleLike === 'string' ? ERole[roleLike as keyof typeof ERole] : roleLike;

    const userRoleItem = roleItem(userRole);
    if (userRoleItem === ERole.Admin) {
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
  return id ? (
    <Button
      type={'link'}
      onClick={() =>
        setParams(registry ? { id, from: registry.replace('/', '') } : { id })
      }
    >
      {name ?? id}
    </Button>
  ) : (
    <Typography.Text type={'secondary'}>NULL</Typography.Text>
  );
}

export function renderYear(value: any) {
  return (
    <Typography.Text type={'secondary'}>
      {value} - {value + 1}
    </Typography.Text>
  );
}

export function renderActions({
  canChange,
  canApprove,
  actions,
  onDelete,
  onEdit,
  onPrint,
  onApprove,
}: {
  canChange: boolean;
  canApprove: boolean;
  actions: TTableActions;
  onEdit: () => void;
  onPrint: () => void;
  onDelete: () => void;
  onApprove: () => void;
}) {
  return (
    <Space>
      {actions.includes('approve') && canApprove && (
        <Button type={'text'} onClick={onApprove}>
          <UserRoundCheck color={theme.defaultConfig.token.colorPrimary} />
        </Button>
      )}
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
