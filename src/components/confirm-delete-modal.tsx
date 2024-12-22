import { Modal, Typography } from 'antd';
import { IIdentifiable, IViewConfig } from '../shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import { $api } from '../shared/api';
import { useMessage } from '../entities/message/lib';
import { appMessages } from '../shared/messages';

interface IProps<DataType extends IIdentifiable> {
  entityName: IViewConfig<DataType>['deleteEntityName'];
  itemToDelete: DataType | null;
  onClose: () => void;
}

export function ConfirmDeleteModal<DataType extends IIdentifiable>({
  entityName,
  itemToDelete,
  onClose,
}: IProps<DataType>) {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const message = useMessage();

  const { mutate, isPending } = useMutation({
    mutationKey: [pathname, itemToDelete, 'delete'],
    mutationFn: () => $api.delete(`${pathname}/${(itemToDelete as any).id}`),
    onSuccess: () => {
      message.success(appMessages.crud.delete.success);
      void queryClient.invalidateQueries({ queryKey: ['data'] });
    },
    onError: () => message.error(appMessages.crud.delete.fail),
    onSettled: () => onClose(),
  });

  return (
    <Modal
      width={400}
      open={!!itemToDelete}
      onCancel={onClose}
      onClose={onClose}
      title={'Подтвердите удаление'}
      okText={'Удалить'}
      cancelText={'Отмена'}
      closable={!isPending}
      okButtonProps={{ danger: true, loading: isPending }}
      onOk={() => mutate()}
    >
      <Typography>Вы уверены что хотите удалить {entityName}</Typography>
    </Modal>
  );
}
