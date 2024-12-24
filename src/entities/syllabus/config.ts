import { IViewConfig } from '../../shared/types';
import { ISyllabus } from './types';
import { renderLink, renderYear } from '../../shared/utils';
import { syllabusApi } from './api';
import { disciplineApi } from '../discipline/api';
import { standardApi } from '../standard/api';

export const syllabusConfig: IViewConfig<ISyllabus> = {
  header: {
    title: 'Учебные программы',
  },
  entityTitle: { key: 'id', prefix: 'Учебная программа' },
  serviceEntityName: 'учебную программу',
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      {
        key: 'discipline_id',
        render: (value, row) =>
          renderLink(value, setParams, 'disciplines', row.discipline_name),
      },
      {
        key: 'standard_id',
        render: (value) => renderLink(value, setParams, 'standards'),
      },
      {
        key: 'year',
        render: renderYear,
      },
    ],
    actions: ['delete', 'print', 'edit'],
    expandable: {
      cond: () => true,
      props: ['aims', 'competencies', 'position_in_scheme', 'requirements'],
    },
  },
  getFn: syllabusApi.get,
  formFields: [
    {
      name: 'discipline_id',
      getFn: disciplineApi.getDictionaries,
    },
    {
      name: 'standard_id',
      getFn: standardApi.getDictionaries,
    },
    { name: 'aims', isTextarea: true },
    { name: 'competencies', isTextarea: true },
    { name: 'requirements', isTextarea: true },
    {
      name: 'position_in_scheme',
      isTextarea: true,
    },
  ],
};
