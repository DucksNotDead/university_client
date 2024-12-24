import { IViewConfig } from '../../shared/types';
import { IAcademicLoad } from './types';
import { academicLoadApi } from './api';
import { renderLink } from '../../shared/utils';
import { specialityApi } from '../speciality/api';
import { disciplineApi } from '../discipline/api';
import { appMessages } from '../../shared/messages';

export const academicLoadConfig: IViewConfig<IAcademicLoad> = {
  header: { title: 'Нагрузки' },
  serviceEntityName: 'нагрузку',
  entityTitle: { key: 'id', prefix: 'Нагрузки' },
  getFn: academicLoadApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      {
        key: 'speciality_id',
        render: (value) => renderLink(value, setParams, 'specialities'),
      },
      {
        key: 'discipline_id',
        render: (value) => renderLink(value, setParams, 'disciplines'),
      },
      { key: 'volume' },
    ],
    actions: ['edit', 'delete'],
  },
  formFields: [
    { name: 'speciality_id', getFn: specialityApi.getDictionaries },
    { name: 'discipline_id', getFn: disciplineApi.getDictionaries },
    {
      name: 'volume',
      rules: [
        { type: 'number', message: appMessages.validation.isNumber },
      ],
    },
  ],
};
