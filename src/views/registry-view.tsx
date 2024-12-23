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
    queryKey: [props.getFn[0]],
    queryFn: props.getFn[1],
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
    setRole(() => (response?.data.role ? Role[response.data.role] : null));
  }, [response]);

  return (
    <Space direction={'vertical'} className={'app-registry-view'}>
      <RegistryHeader {...props.header} role={role} />
      <RegistryTable
        {...props.table}
        data={data ?? []}
        loading={isPending}
        onDelete={handleDelete}
        role={role}
      />
      <RegistryItemModal
        items={data ?? []}
        role={role}
        entityTitle={props.entityTitle}
        formFields={props.formFields}
        serviceEntityName={props.serviceEntityName}
        getKey={props.getFn[0]}
      />
      <ConfirmDeleteModal
        entityName={props.serviceEntityName}
        itemToDelete={itemToDelete}
        onClose={handleDeleteModalClose}
        getKey={props.getFn[0]}
      />
    </Space>
  );
}
