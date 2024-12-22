import { useEffect } from 'react';
import { Button, Space } from 'antd';
import { appRoutes } from './routes';
import { TSetParamsFn, TTableActions } from './types';
import { Pencil, Printer, Trash } from 'lucide-react';

export function useLog(...args: any[]) {
  useEffect(() => {
    console.log(...args);
  }, [args]);
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
  actions,
  onDelete,
  onEdit,
  onPrint,
}: {
  actions: TTableActions;
  onEdit: () => void;
  onPrint: () => void;
  onDelete: () => void;
}) {
  return (
    <Space>
      {actions.includes('delete') && (
        <Button type={'text'} onClick={onDelete}>
          <Trash color={'red'} />
        </Button>
      )}
      {actions.includes('edit') && (
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
