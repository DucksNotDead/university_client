import { IOption, IViewConfig } from '../../shared/types';
import { IDisciplineInStudyPlan } from './types';
import { disciplineInStudyPlanApi } from './api';
import { renderLink } from '../../shared/utils';
import { EStudyType, ruStudyTypes } from '../../shared/studyTypes';
import { disciplineApi } from '../discipline/api';
import { studyPlanApi } from '../study-plan/api';
import { appMessages } from '../../shared/messages';

export const disciplineInStudyPlanConfig: IViewConfig<IDisciplineInStudyPlan> = {
  header: { title: 'Дисциплины в учебном плане' },
  serviceEntityName: 'дисциплину в учебном плане',
  entityTitle: { key: 'id', prefix: 'Дисциплины' },
  getFn: disciplineInStudyPlanApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      {
        key: 'discipline_id',
        render: (value) => renderLink(value, setParams, 'disciplines'),
      },
      {
        key: 'study_plan_id',
        render: (value) => renderLink(value, setParams, 'studyPlans'),
      },
      { key: 'semester' },
      { key: 'type', render: (value) => ruStudyTypes[value as EStudyType] },
      { key: 'hours' },
    ],
    actions: ['edit', 'delete'],
  },
  formFields: [
    { name: 'discipline_id', getFn: disciplineApi.getDictionaries },
    { name: 'study_plan_id', getFn: studyPlanApi.getDictionaries },
    {
      name: 'semester',
      rules: [
        { type: 'number', message: appMessages.validation.isNumber },
      ],
    },
    {
      name: 'type',
      getFn: [
        'get study types',
        async () =>
          Object.keys(ruStudyTypes).map(
            (studyType) =>
              ({
                label: ruStudyTypes[studyType as keyof typeof ruStudyTypes],
                value: studyType,
              }) as IOption,
          ),
      ],
    },
    {
      name: 'hours',
      rules: [
        { type: 'number', message: appMessages.validation.isNumber },
      ],
    },
  ],
};
