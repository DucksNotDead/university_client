import { JSX } from 'react';
import { appRoutes } from './routes';
import { Rule } from 'antd/es/form';

export interface IRoute {
  path: (typeof appRoutes)[keyof typeof appRoutes];
  component: JSX.Element;
}

export interface IIdentifiable {
  id: number;
}

export interface IDictionary extends IIdentifiable {
  name: string;
}

export interface IOption {
  value: string | number;
  label: string | number;
}

export interface IFormItem<T extends object> {
  name: keyof T;
  label: string;
  rules: Rule[];
}

interface IStringFilter<FilterConfig extends object> {
  type: 'string';
  name: keyof FilterConfig;
  label: string;
}

export interface IEntityFilter<FilterConfig extends object> {
  type: 'entity';
  name: keyof FilterConfig;
  label: string;
  fetcher: (query: string) => Promise<IOption[]>;
}

export type TFilter<FilterConfig extends object> =
  | IStringFilter<FilterConfig>
  | IEntityFilter<FilterConfig>;

export interface IHeaderProps<FilterConfig extends object> {
  title: string;
  filters?: TFilter<FilterConfig>[];
  search?: (query: string) => void;
}

export interface ITableProps {

}

export interface IViewConfig<FilterConfig extends object> {
  header: IHeaderProps<FilterConfig>;
  table: ITableProps
}
