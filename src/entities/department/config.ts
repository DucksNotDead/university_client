import { IViewConfig } from '../../shared/types';
import { IDepartment } from './types';
import { departmentApi } from './api';
import { renderLink } from '../../shared/utils';
import { facultyApi } from '../faculty/api';
import { userApi } from '../user/api';

export const departmentConfig: IViewConfig<IDepartment> = {
  header: { title: 'Кафедры' },
  serviceEntityName: 'кафедру',
  entityTitle: { key: 'name', prefix: 'Кафедры' },
  getFn: departmentApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      { key: 'name' },
      { key: 'faculty_id', render: (value) => renderLink(value, setParams, 'faculties') },
      { key: 'head_id', render: (value) => renderLink(value, setParams, 'users') },
    ],
    actions: ['edit', 'delete'],
  },
  formFields: [
    { name: 'faculty_id', getFn: facultyApi.getDictionaries },
    { name: 'head_id', getFn: userApi.getDictionaries },
    { name: 'name' },
  ],
};
