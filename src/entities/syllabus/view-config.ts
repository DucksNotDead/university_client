import { IViewConfig } from '../../shared/types';
import { ISyllabus } from './types';
import { renderLink } from '../../shared/utils';
import { syllabusApi } from './api';

export const syllabusViewConfig: IViewConfig<ISyllabus> = {
  header: {
    title: 'Учебные программы',
  },
  entityTitle: { key: 'id', prefix: 'Учебная программа' },
  deleteEntityName: 'учебную программу',
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
    ],
    actions: ['delete', 'print', 'edit'],
    expandable: {
      cond: () => true,
      props: {
        aims: 'Цели',
        contents: 'Разделы',
        competencies: 'Компетенции',
        position_in_scheme: 'Место в программе',
        requirements: 'Необходимые квалификации',
      },
    },
  },
  getFn: syllabusApi.get,
};
