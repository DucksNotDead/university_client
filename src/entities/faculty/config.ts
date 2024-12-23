import { IViewConfig } from '../../shared/types';
import { IFaculty } from './types';
import { facultyApi } from './api';
import { renderLink } from '../../shared/utils';

export const facultyConfig: IViewConfig<IFaculty> = {
  header: { title: 'Факультеты' },
  serviceEntityName: 'факультет',
  entityTitle: { key: 'name', prefix: 'Факультеты' },
  getFn: facultyApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      { key: 'name' },
    ],
    actions: ['edit', 'delete'],
  },
  formFields: [{ name: 'name' }],
};
