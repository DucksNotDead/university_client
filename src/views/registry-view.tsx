import { IIdentifiable, IViewConfig } from '../shared/types';
import { RegistryHeader } from '../components/registry-header';
import { Space } from 'antd';
import { RegistryTable } from '../components/registry-table';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { RegistryItemModal } from '../components/registry-item-modal';
import { Role } from '../shared/roles';
import { ConfirmDeleteModal } from '../components/confirm-delete-modal';

export function RegistryView<DataType extends IIdentifiable>(
  props: IViewConfig<DataType>,
) {
  const [data, setData] = useState<DataType[]>([]);
  const [role, setRole] = useState<Role | null>(null);
  const [itemToDelete, setItemToDelete] = useState<DataType | null>(null);

  const { data: response, isPending } = useQuery({
    queryKey: ['data'],
    queryFn: props.getFn,
  });

  const handleDelete = useCallback(
    (id: number) => {
      setItemToDelete(
        () => data?.find((item) => (item as IIdentifiable).id === id) ?? null,
      );
    },
    [data],
  );

  const handleDeleteModalClose = useCallback(() => {
    setItemToDelete(() => null);
  }, []);

  useEffect(() => {
    setData(() => response?.data.data ?? []);
    setRole(() => response?.data.role ?? null);
  }, [response]);

  return (
    <Space direction={'vertical'} className={'app-registry-view'}>
      <RegistryHeader {...props.header} />
      <RegistryTable
        {...props.table}
        data={data ?? []}
        loading={isPending}
        onDelete={handleDelete}
      />
      <RegistryItemModal
        items={data ?? []}
        role={role}
        entityTitle={props.entityTitle}
        formFields={props.formFields}
      />
      <ConfirmDeleteModal
        entityName={props.deleteEntityName}
        itemToDelete={itemToDelete}
        onClose={handleDeleteModalClose}
      />
    </Space>
  );
}
