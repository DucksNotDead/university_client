import { JSX, ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { AxiosResponse } from 'axios';
import { ExpandableConfig } from 'antd/es/table/interface';
import { Role } from './roles';

export interface IRoute {
  path: string;
  component: JSX.Element;
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

export interface IConfigFormItem<T> {
  name: keyof T;
  label: string;
  rules: Rule[];
  searchFn?: (query: string) => Promise<IOption[]>;
}

export interface IInnerFormItem<T extends IIdentifiable> extends IConfigFormItem<T> {
  value: string | number;
}

export interface IHeaderProps {
  title: string;
}

export interface IColumn<DataType> {
  key: keyof DataType;
  render?: (value: DataType[keyof DataType], row: DataType) => ReactNode;
}

export type TTableActions = ('edit' | 'delete' | 'print')[];

export type TSetParamsFn = (params: Record<string, any>) => void;

export type TFormMode = 'create' | 'update' | 'view';

export interface ITableProps<DataType extends IIdentifiable> {
  columns: (setParams: TSetParamsFn) => IColumn<DataType>[];
  actions?: TTableActions;
  expandable?: {
    props: Partial<Record<keyof DataType, string | undefined>>;
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
  deleteEntityName: string;
  table: ITableProps<DataType>;
  getFn: () => Promise<AxiosResponse<IResponse<DataType[]>>>;
  formFields: IConfigFormItem<DataType>[];
}

export interface IResponse<T> {
  success: boolean;
  data: T;
  error: any;
  role: Role;
}

export type TEntityWithTitle<T extends IIdentifiable> = T & {
  entityTitle: { key?: keyof T; prefix?: string };
};

export interface IItemResponse<T extends IIdentifiable> extends IResponse<T> {
  data: TEntityWithTitle<T>;
}
