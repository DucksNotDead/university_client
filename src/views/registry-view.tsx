import { IViewConfig } from '../shared/types';
import { RegistryHeader } from '../components/registry-header';
import { Space } from 'antd';
import { RegistryTable } from '../components/registry-table';

interface IProps<T extends object> extends IViewConfig<T> {}

export function RegistryView<DataType extends object, FiltersConfig extends object>(
  props: IProps<FiltersConfig>,
) {
  return (
    <Space direction={'vertical'}>
      <RegistryHeader {...props.header} />
      <RegistryTable />
    </Space>
  );
}
