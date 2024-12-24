import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { AxiosResponse } from 'axios';
import { ExpandableConfig } from 'antd/es/table/interface';
import { ERole } from './roles';

export interface IRoute {
  path: string;
  config: IViewConfig<any>;
}

export interface IIdentifiable {
  id: number;
}

export interface IDictionary extends IIdentifiable {
  name: string;
}

export interface IContent {
  title: string;
  text: string;
}

export interface IOption {
  value: string | number;
  label: string | number;
}

export type TSearchFn = (query: string) => Promise<IOption[]>;

export type TGetQuery<DataType extends IIdentifiable> = [
  string,
  () => Promise<AxiosResponse<IResponse<DataType[]>>>,
];

export type TGetDictionaryQuery = [string, () => Promise<IOption[]>];

export interface IConfigFormItem<T> {
  name: keyof T;
  rules?: Rule[];
  getFn?: TGetDictionaryQuery;
  isTextarea?: boolean;
  optional?: boolean;
  label?: string;
}

export type TApi<T extends IIdentifiable> = Record<
  string,
  TGetQuery<T> | TGetDictionaryQuery
>;

export interface IHeaderProps {
  title: string;
}

export interface IColumn<DataType> {
  key: keyof DataType;
  render?: (value: DataType[keyof DataType], row: DataType) => ReactNode;
}

export type TTableActions = ('edit' | 'delete' | 'print' | 'approve')[];

export type TSetParamsFn = (params: Record<string, any>) => void;

export type TFormMode = 'create' | 'update' | 'view';

export interface ITableProps<DataType extends IIdentifiable> {
  columns: (setParams: TSetParamsFn) => IColumn<DataType>[];
  actions?: TTableActions;
  expandable?: {
    props: (keyof Omit<DataType, 'id'>)[];
    cond: ExpandableConfig<DataType>['rowExpandable'];
  };
}

export interface IPagination {
  pageSize?: number;
  pageIndex?: number;
}

export interface IViewConfig<DataType extends IIdentifiable> {
  header: IHeaderProps;
  entityTitle: { key?: keyof DataType; prefix?: string };
  serviceEntityName: string;
  table: ITableProps<DataType>;
  getFn: TGetQuery<DataType>;
  formFields: IConfigFormItem<Omit<DataType, 'id'>>[];
  showList?: Record<keyof DataType, string>
}

export interface IResponse<T> {
  success: boolean;
  data: T;
  error: any;
  role: ERole;
}

export type TEntityWithTitle<T extends IIdentifiable> = T & {
  entityTitle: { key?: keyof T; prefix?: string };
};

export interface IItemResponse<T extends IIdentifiable> extends IResponse<T> {
  data: TEntityWithTitle<T>;
}
