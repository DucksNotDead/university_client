import { IViewConfig } from '../../shared/types';
import { IStandard } from './types';
import { standardApi } from './api';
import { renderLink } from '../../shared/utils';
import { disciplineApi } from '../discipline/api';

export const standardConfig: IViewConfig<IStandard> = {
  header: { title: 'Стандарты' },
  serviceEntityName: 'стандарт',
  entityTitle: { key: 'id', prefix: 'Стандарт' },
  getFn: standardApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      {
        key: 'discipline_id',
        render: (value) => renderLink(value, setParams, 'disciplines'),
      },
    ],
    actions: ['edit', 'delete'],
    expandable: {
      cond: () => true,
      props: ['themes', 'contents'],
    },
  },
  formFields: [
    { name: 'discipline_id', getFn: disciplineApi.getDictionaries },
    { name: 'themes', isTextarea: true },
    { name: 'contents', isTextarea: true },
  ],
};
