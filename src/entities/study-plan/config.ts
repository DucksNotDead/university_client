import { IViewConfig } from '../../shared/types';
import { IStudyPlan } from './types';
import { studyPlanApi } from './api';
import { renderLink } from '../../shared/utils';
import { specialityApi } from '../speciality/api';
import { appMessages } from '../../shared/messages';

export const studyPlanConfig: IViewConfig<IStudyPlan> = {
  header: { title: 'Учебные планы' },
  serviceEntityName: 'учебный план',
  entityTitle: { key: 'id', prefix: 'Учебные планы' },
  getFn: studyPlanApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      { key: 'year' },
      {
        key: 'speciality_id',
        render: (value) => renderLink(value, setParams, 'specialities'),
      },
    ],
    actions: ['delete', 'edit'],
    expandable: {
      cond: () => true,
      props: ['description'],
    },
  },
  formFields: [
    { name: 'speciality_id', getFn: specialityApi.getDictionaries },
    {
      name: 'year',
      rules: [
        { type: 'number', message: appMessages.validation.isNumber },
      ],
    },
    { name: 'description', isTextarea: true },
  ],
};
