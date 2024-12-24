import { IIdentifiable, IResponse, IViewConfig } from '../shared/types';
import { RegistryHeader } from '../components/registry-header';
import { Space } from 'antd';
import { RegistryTable } from '../components/registry-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { RegistryItemModal } from '../components/registry-item-modal';
import { ERole } from '../shared/roles';
import { ConfirmDeleteModal } from '../components/confirm-delete-modal';
import { $api } from '../shared/api';
import { useLocation } from 'react-router';
import { useMessage } from '../entities/message/lib';
import { appMessages } from '../shared/messages';
import { ISyllabusReportInfo } from '../entities/syllabus/types';
import { SyllabusReportView } from './syllabus-report-view';

export function RegistryView<DataType extends IIdentifiable>(
  props: IViewConfig<DataType>,
) {
  const queryClient = useQueryClient();
  const message = useMessage();
  const { pathname } = useLocation();
  const [data, setData] = useState<DataType[]>([]);
  const [role, setRole] = useState<ERole | null>(null);
  const [itemToDelete, setItemToDelete] = useState<DataType | null>(null);
  const [itemToPrint, setItemToPrint] = useState<ISyllabusReportInfo | null>(null);

  const { data: response, isPending } = useQuery({
    queryKey: [props.getFn[0]],
    queryFn: props.getFn[1],
  });

  const { mutate: approveMutation } = useMutation({
    mutationKey: ['approve item'],
    mutationFn: ({ path, item }: { path: string; item: DataType }) =>
      $api.put(`${path}`, { ...item, approved: true }),
    onSuccess: () => {
      message.success(appMessages.crud.update.success);
      void queryClient.invalidateQueries({ queryKey: [props.getFn[0]] });
    },
    onError: () => message.error(appMessages.crud.update.fail),
  });

  const { mutate: reportMutation } = useMutation({
    mutationKey: ['get report syllabus'],
    mutationFn: (id: number) =>
      $api.get<IResponse<ISyllabusReportInfo>>(`/syllabuses/reports/${id}`),
    onSuccess: ({ data }) => {
      setItemToPrint(() => data.data);
    },
  });

  const handleApprove = useCallback(
    (id: number) => {
      const item = data.find((el) => el.id === id);
      if (item) {
        approveMutation({ item, path: pathname });
      }
    },
    [data, pathname, approveMutation],
  );

  const handlePrint = useCallback(
    (id: number) => {
      reportMutation(id);
    },
    [reportMutation],
  );

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
    setData(() => response?.data?.data ?? []);
    setRole(() => (response?.data?.role ? ERole[response.data.role] : null));
  }, [response]);

  return (
    <div className={'app-registry-view-container'}>
      <Space direction={'vertical'} className={'app-registry-view'}>
        <RegistryHeader {...props.header} role={role} />
        <RegistryTable
          {...props.table}
          data={data ?? []}
          loading={isPending}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onPrint={handlePrint}
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
      <SyllabusReportView
        item={itemToPrint}
        className={'app-registry-view'}
        onExport={() => setItemToPrint(() => null)}
      />
    </div>
  );
}
