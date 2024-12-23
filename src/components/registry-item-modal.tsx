import { List, Modal } from 'antd';
import { useLocation, useSearchParams } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { $api } from '../shared/api';
import { IIdentifiable, IResponse, IViewConfig, TFormMode } from '../shared/types';
import { ERole } from '../shared/roles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateUpdateForm } from './create-update-form';
import { useRights } from '../shared/utils';
import { appMessages } from '../shared/messages';
import { useMessage } from '../entities/message/lib';
import { appDictionary } from '../shared/dictionary';
import { appRouterRoutes } from '../router';

interface IProps<T extends IIdentifiable>
  extends Pick<IViewConfig<T>, 'serviceEntityName' | 'entityTitle' | 'formFields'> {
  items: T[];
  role: ERole | null;
  getKey: string;
}

export function RegistryItemModal<T extends IIdentifiable>({
  items,
  role,
  entityTitle,
  serviceEntityName,
  formFields,
  getKey,
}: IProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const message = useMessage();
  const client = useQueryClient();

  const [item, setItem] = useState<T | null>(null);
  const [externalEntityTitle, setExternalEntityTitle] = useState<
    IViewConfig<T>['entityTitle'] | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataRole, setDataRole] = useState<ERole | null>(null);
  const [editValue, setEditValue] = useState(false);
  const [createValue, setCreateValue] = useState(false);
  const [isError, setIsError] = useState(false);
  const canChange = useRights(dataRole);

  const formMode = useMemo<TFormMode>(() => {
    if (!canChange) return 'view';
    if (createValue) return 'create';
    if (editValue) return 'update';
    return 'view';
  }, [canChange, editValue, createValue]);

  const title = useMemo<string>(() => {
    if (isError) {
      return 'Ошибка!';
    }
    if (createValue) {
      return `Добавить ${serviceEntityName}`;
    }
    if (!item) {
      return '';
    }
    const { key, prefix } = externalEntityTitle ?? entityTitle;
    return (prefix ?? '') + (key ? (key === 'id' ? ' ID = ' : ': ') + item[key] : '');
  }, [isError, createValue, item, serviceEntityName, entityTitle, externalEntityTitle]);

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
    onError: () => {
      setItem(() => null);
      setEditValue(() => false);
      setCreateValue(() => false);
      setIsError(() => true);
    },
    onSettled: () => setTimeout(() => setIsLoading(false), 800),
  });

  const { mutate: createUpdateMutation, isPending: createUpdatePending } = useMutation({
    mutationKey: [formMode, 'createUpdateItem'],
    mutationFn: (data: T) =>
      $api[formMode === 'update' ? 'put' : 'post'](
        `${pathname}${formMode === 'update' ? '' : '/create'}`,
        data,
      ),
    onSuccess: () => {
      message.success(
        appMessages.crud[formMode === 'update' ? 'update' : 'create'].success,
      );
      void client.invalidateQueries({ queryKey: [getKey] });
    },
    onError: () =>
      message.error(appMessages.crud[formMode === 'update' ? 'update' : 'create'].fail),
    onSettled: () => handleClose(),
  });

  const handleClose = useCallback(() => {
    setSearchParams(() => ({}));
  }, [setSearchParams]);

  const handleConfirm = useCallback(
    (item: T) => {
      createUpdateMutation(item);
    },
    [createUpdateMutation],
  );

  useEffect(() => {
    const id = Number(searchParams.get('id'));
    const createValue = Boolean(searchParams.get('create'));

    if (!id && !createValue) {
      if (searchParams.size > 0) setSearchParams(() => ({}));
      setItem(() => null);
      setExternalEntityTitle(() => null);
      setIsOpen(() => false);
      setIsLoading(() => false);
      setDataRole(() => null);
      setEditValue(() => false);
      setCreateValue(() => false);
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
      setExternalEntityTitle(
        () =>
          appRouterRoutes.find((route) => route.path === `/${from}`)?.config
            .entityTitle ?? (null as any),
      );
    } else {
      setItem(() => {
        const candidate = items.find((item) => item.id === id);
        if (!candidate) {
          return null;
        } else {
          return candidate;
        }
      });
      setDataRole(() => role ?? null);
    }
  }, [searchParams, pathname, items, role, mutate, setSearchParams]);

  return (
    <Modal
      destroyOnClose
      width={600}
      title={title}
      open={isOpen}
      onCancel={handleClose}
      loading={isLoading}
      closable={!createUpdatePending}
      footer={null}
    >
      {formMode === 'view' ? (
        <List
          dataSource={Object.keys(item ?? {}).map((key) => {
            const value = item?.[key as keyof typeof item];
            if (typeof value === 'object') {
              return {};
            }
            return {
              title: appDictionary[key as keyof typeof appDictionary],
              value: value,
            };
          })}
          renderItem={({ title, value }) =>
            title && (
              <List.Item>
                <List.Item.Meta title={title} description={value as string} />
              </List.Item>
            )
          }
        />
      ) : (
        <CreateUpdateForm
          item={item}
          fields={formFields}
          mode={formMode}
          onCancel={handleClose}
          onConfirm={handleConfirm}
        />
      )}
    </Modal>
  );
}
