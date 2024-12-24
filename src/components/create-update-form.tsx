import {
  IConfigFormItem,
  IIdentifiable,
  TFormMode,
  TGetDictionaryQuery,
} from '../shared/types';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { useQuery } from '@tanstack/react-query';
import TextArea from 'antd/es/input/TextArea';
import { Rule } from 'antd/es/form';
import { appMessages } from '../shared/messages';
import { useCallback, useEffect, useState } from 'react';
import { appDictionary } from '../shared/dictionary';

interface IProps<T extends IIdentifiable> {
  mode: TFormMode;
  fields: IConfigFormItem<T>[];
  item: T | null;
  onCancel: () => void;
  onConfirm: (item: T) => void;
}

const { useForm, useWatch, Item } = Form;

export function CreateUpdateForm<T extends IIdentifiable>({
  fields,
  mode,
  onConfirm,
  onCancel,
  item,
}: IProps<T>) {
  const [form] = useForm<T>();
  const allFields = useWatch([], form);
  const [isReady, setIsReady] = useState(false);

  const handleConfirm = useCallback(() => {
    onConfirm({ ...allFields, id: item?.id });
  }, [allFields, onConfirm, item]);

  useEffect(() => {
    form
      ?.validateFields({ validateOnly: true })
      .then(() => {
        if (mode === 'update') {
          for (const key in item) {
            setIsReady(() => false);
            if (allFields?.[key] && allFields[key] !== item[key]) {
              setIsReady(() => true);
              break;
            }
          }
        } else {
          setIsReady(() => true);
        }
      })
      .catch(() => setIsReady(() => false));
  }, [allFields, form, item, mode]);

  useEffect(() => {
    if (mode === 'update' && item) {
      const { id, ...data } = item;
      form?.setFieldsValue(data as any);
    } else {
      form?.resetFields();
    }
  }, [mode, form, item]);

  return (
    <Form form={form} layout={'vertical'}>
      {fields.map(({ name, label, rules, optional, isTextarea, getFn }) => (
        <Item
          key={name as string}
          name={name as string}
          label={label ?? appDictionary[name as keyof typeof appDictionary]}
          rules={[
            ...(rules ?? []),
            ...(optional
              ? []
              : [{ required: true, message: appMessages.validation.required } as Rule]),
          ]}
        >
          {getFn ? (
            <SearchSelect
              getFn={getFn}
              onChange={(value) =>
                value !== form.getFieldValue([name] as any) &&
                form.setFieldValue([name] as any, value)
              }
              value={form.getFieldValue([name] as any)}
            />
          ) : isTextarea ? (
            <TextArea placeholder={'Введите'} />
          ) : rules?.find((rule) => (rule as any).type === 'number') ? (
            <InputNumber placeholder={'Введите'} />
          ) : (
            <Input placeholder={'Введите'} />
          )}
        </Item>
      ))}
      <Item>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>Отменить</Button>
          <Button type={'primary'} disabled={!isReady} onClick={handleConfirm}>
            Сохранить
          </Button>
        </Space>
      </Item>
    </Form>
  );
}

function SearchSelect({
  getFn: [key, getFn],
  value,
  onChange,
}: {
  getFn: TGetDictionaryQuery;
  value: number;
  onChange: (value: number) => void;
}) {
  const { data, isPending } = useQuery({
    queryFn: getFn,
    queryKey: [key],
  });

  return (
    <Select
      placeholder={'Выберите'}
      options={data}
      loading={isPending}
      showSearch
      filterOption={(input, option) =>
        ((option?.label ?? '') as string)?.toLowerCase().includes(input.toLowerCase())
      }
      value={value}
      onSelect={onChange}
    />
  );
}
