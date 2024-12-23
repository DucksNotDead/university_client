import { IViewConfig } from '../../shared/types';
import { IDiscipline } from './types';
import { disciplineApi } from './api';
import { renderLink } from '../../shared/utils';
import { departmentApi } from '../department/api';

export const disciplineConfig: IViewConfig<IDiscipline> = {
  header: { title: 'Дисциплины' },
  serviceEntityName: 'дисциплину',
  entityTitle: { key: 'name', prefix: 'Дисциплины' },
  getFn: disciplineApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      {
        key: 'department_id',
        render: (value) => renderLink(value, setParams, 'departments'),
      },
      { key: 'name' },
    ],
    actions: ['edit', 'delete'],
  },
  formFields: [
    { name: 'department_id', getFn: departmentApi.getDictionaries },
    { name: 'name' },
  ],
};
