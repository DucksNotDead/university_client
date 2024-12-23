import { IViewConfig } from '../../shared/types';
import { ISpeciality } from './types';
import { specialityApi } from './api';
import { renderLink } from '../../shared/utils';
import { stringRules } from '../../shared/common';
import { facultyApi } from '../faculty/api';

export const specialityConfig: IViewConfig<ISpeciality> = {
  header: { title: 'Специальности' },
  serviceEntityName: 'специальность',
  entityTitle: { key: 'name', prefix: 'Специальности' },
  getFn: specialityApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      { key: 'name' },
      { key: 'faculty_id', render: (value) => renderLink(value, setParams, 'faculties') },
      { key: 'direction' },
    ],
    actions: ['delete', 'edit'],
  },
  formFields: [
    { name: 'name', rules: stringRules },
    { name: 'faculty_id', getFn: facultyApi.getDictionaries },
    { name: 'direction', isTextarea: true },
  ],
};
