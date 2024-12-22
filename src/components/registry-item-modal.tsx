import { Modal } from 'antd';
import { useLocation, useSearchParams } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { $api } from '../shared/api';
import {
  IIdentifiable,
  IResponse,
  IViewConfig,
  TEntityWithTitle,
  TFormMode,
} from '../shared/types';
import { useAuth } from '../entities/auth/lib';
import { Role } from '../shared/roles';
import { useMutation } from '@tanstack/react-query';
import { CreateUpdateForm } from './create-update-form';

interface IProps<T extends IIdentifiable> {
  entityTitle: IViewConfig<T>['entityTitle'];
  formFields: IViewConfig<T>['formFields'];
  items: T[];
  role: Role|null;
}

export function RegistryItemModal<T extends IIdentifiable>({
  items,
  role,
  entityTitle,
  formFields,
}: IProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { user } = useAuth();

  const [item, setItem] = useState<TEntityWithTitle<T> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataRole, setDataRole] = useState<Role | null>(null);
  const [editValue, setEditValue] = useState(false);
  const [createValue, setCreateValue] = useState(false);
  const [isError, setIsError] = useState(false);

  const title = useMemo<string>(() => {
    if (isError) {
      return 'Ошибка!';
    }
    if (!item) {
      return '';
    }
    const { key, prefix } = item.entityTitle;
    return (prefix ?? '') + (key ? (key === 'id' ? ' ID = ' : ': ') + item[key] : '');
  }, [item, isError]);

  const canChange = useMemo(() => {
    return !!(user?.role && dataRole && user.role === dataRole);
  }, [user?.role, dataRole]);

  const formMode = useMemo<TFormMode>(() => {
    if (!canChange) return 'view';
    if (createValue) return 'create';
    if (editValue) return 'update';
    return 'view';
  }, [canChange, editValue, createValue]);

  const { mutate } = useMutation({
    mutationKey: ['getItem'],
    mutationFn: ({ from, id }: { from: string; id: number }) => {
      setIsLoading(() => true);
      return $api.get<IResponse<any>>(`${from}/${id}`);
    },
    onSuccess: ({ data }) => {
      setItem(() => data.data ?? null);
      setDataRole(() => data.role);
    },
    onError: (error) => {
      setItem(() => null);
      setEditValue(() => false);
      setCreateValue(() => false);
      setIsError(() => true);
    },
    onSettled: () => setTimeout(() => setIsLoading(false), 800),
  });

  useEffect(() => {
    const id = Number(searchParams.get('id'));
    const createValue = Boolean(searchParams.get('create'));

    if (!id && !createValue) {
      if (searchParams.size > 0) setSearchParams(() => ({}));
      setIsOpen(() => false);
      setItem(() => null);
      setEditValue(() => false);
      setCreateValue(() => false);
      setDataRole(() => null);
      setIsError(() => false);
      return;
    }

    setIsOpen(() => true);

    if (createValue) {
      setCreateValue(() => true);
      return;
    }

    setEditValue(() => Boolean(searchParams.get('edit')));

    const from = searchParams.get('from');

    if (from) {
      mutate({ from, id });
    } else {
      setItem(() => {
        const candidate = items.find((item) => item.id === id);
        if (!candidate) {
          return null;
        } else {
          return { ...candidate, entityTitle };
        }
      });
      setDataRole(() => role ?? null);
    }
  }, [searchParams, pathname, items, role, mutate, entityTitle, setSearchParams]);

  const handleClose = useCallback(() => {
    setSearchParams(() => ({}));
  }, [setSearchParams]);

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={handleClose}
      loading={isLoading}
      footer={null}
    >
      <CreateUpdateForm item={item} fields={formFields} mode={formMode} />
    </Modal>
  );
}
