import { Select } from 'antd';
import { IEntityFilter } from '../shared/types';
import { useCallback, useState } from 'react';

interface IProps<T extends string | number, FilterConfig extends object> {
  value: T;
  onChange: (value: T) => void;
  fetcher: IEntityFilter<FilterConfig>['fetcher'];
}

export function SearchSelect<T extends string | number, FilterConfig extends object>({
  fetcher,
  value,
  onChange,
}: IProps<T, FilterConfig>) {
  const [data, setData] = useState<any[]>([]);

  const handleSearch = useCallback(
    (query: string) => {
      fetcher(query).then((data) => setData(() => data));
    },
    [fetcher],
  );

  return (
    <Select
      showSearch
      value={value}
      placeholder={'Выберете'}
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={null}
      onSearch={handleSearch}
      onChange={onChange}
      options={data || []}
    />
  );
}
