import { TFilter } from '../shared/types';
import { Button, Drawer, Form, Input, Space } from 'antd';
import { useCallback } from 'react';
import { SearchSelect } from './search-select';

interface IProps<T extends object> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (filters: T) => void;
  filters: TFilter<T>[];
}

export function RegistryFiltersDrawer<T extends object>({
  filters,
  isOpen,
  onClose,
  onConfirm,
}: IProps<T>) {
  const [form] = Form.useForm<T>();
  const values = Form.useWatch([], form);

  const handleClose = useCallback(() => {
    form.resetFields();
    onClose();
  }, [onClose, form]);

  const handleConfirm = useCallback(() => {
    onConfirm(values);
    onClose();
  }, [onConfirm, onClose, values]);

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      extra={
        <Space>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={handleConfirm} type="primary">
            Обновить
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        {filters.map((filter) => (
          <Form.Item
            key={filter.name as string}
            name={filter.name as string}
            label={filter.label}
          >
            {filter.type === 'string' ? (
              <Input variant={'filled'} placeholder={'Введите'} />
            ) : (
              <SearchSelect
                value={form.getFieldValue(filter.name as any)}
                onChange={(value) => form.setFieldValue(filter.name as any, value)}
                fetcher={filter.fetcher}
              />
            )}
          </Form.Item>
        ))}
      </Form>
    </Drawer>
  );
}
