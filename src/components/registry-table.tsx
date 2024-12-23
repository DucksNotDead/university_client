import { IIdentifiable, ITableProps } from '../shared/types';
import { List, Table } from 'antd';
import { useSearchParams } from 'react-router';
import { useCallback, useMemo } from 'react';
import { appDictionary } from '../shared/dictionary';
import { renderActions, useRights } from '../shared/utils';
import { ColumnsType } from 'antd/lib/table';
import { ERole } from '../shared/roles';

const PAGE_SIZE = 10;

interface IProps<DataType extends IIdentifiable> extends ITableProps<DataType> {
  data: DataType[];
  loading: boolean;
  onDelete: (id: number) => void;
  role: ERole | null;
}

export function RegistryTable<DataType extends IIdentifiable>({
  onDelete,
  expandable,
  columns,
  actions,
  data,
  loading,
  role,
}: IProps<DataType>) {
  const [, setSearchParams] = useSearchParams();
  const canChange = useRights(role);

  const handleEdit = useCallback(
    (id: number) => {
      setSearchParams(() => ({ edit: 'true', id: id.toString() }));
    },
    [setSearchParams],
  );

  const handlePrint = useCallback(() => {}, []);

  const columnsMapped = useMemo<ColumnsType<DataType>>(() => {
    return [
      ...columns((params) => setSearchParams(() => params)).map((column) => ({
        dataIndex: column.key as string,
        title: appDictionary[column.key as keyof typeof appDictionary] ?? column.key,
        render: column.render,
      })),
      ...(actions?.length && canChange
        ? ([
            {
              dataIndex: 'actions',
              title: 'Действия',
              render: (_, record) => {
                const id = (record as IIdentifiable).id;
                return renderActions({
                  canChange,
                  actions,
                  onPrint: () => handlePrint(),
                  onEdit: () => handleEdit(id),
                  onDelete: () => onDelete(id),
                });
              },
            },
          ] as ColumnsType<DataType>)
        : []),
    ];
  }, [columns, actions, setSearchParams, canChange, handlePrint, handleEdit, onDelete]);

  return (
    <Table<DataType>
      tableLayout={'fixed'}
      sticky={true}
      rowKey={'id'}
      columns={columnsMapped}
      dataSource={data}
      pagination={data.length > PAGE_SIZE ? { pageSize: PAGE_SIZE } : false}
      loading={loading}
      expandable={
        expandable && {
          rowExpandable: expandable.cond,
          expandedRowRender: (record) => {
            return (
              <List
                style={{ padding: '0 12px' }}
                itemLayout={'horizontal'}
                rowKey={'title'}
                dataSource={expandable.props.map((propName) => ({
                  title: appDictionary[propName as keyof typeof appDictionary],
                  value: (record[propName as keyof typeof record] ?? '') as string,
                }))}
                renderItem={({ title, value }) => (
                  <List.Item>
                    <List.Item.Meta title={title} description={value} />
                  </List.Item>
                )}
              />
            );
          },
        }
      }
    />
  );
}
