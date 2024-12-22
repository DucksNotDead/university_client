import { IIdentifiable, IViewConfig, TFormMode } from '../shared/types';
import { Form } from 'antd';

interface IProps<T extends IIdentifiable> {
  mode: TFormMode
  fields: IViewConfig<T>['formFields'];
  item: T | null;
}

export function CreateUpdateForm<T extends IIdentifiable>({ fields }: IProps<T>) {
  return <Form>{}</Form>;
}
