import { IOption, IViewConfig } from '../../shared/types';
import { IUser } from './types';
import { userApi } from './api';
import { renderLink } from '../../shared/utils';
import { createRoles, ERole, ruRole } from '../../shared/roles';
import { departmentApi } from '../department/api';
import { stringRules } from '../../shared/common';

export const userConfig: IViewConfig<IUser> = {
  header: { title: 'Пользователи' },
  serviceEntityName: 'пользователя',
  entityTitle: { key: 'id', prefix: 'Пользователь' },
  getFn: userApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      {
        key: 'surname',
        render: (_, record) =>
          `${record.surname} ${record.name} ${record.middlename ?? ''}`,
      },
      {
        key: 'department_id',
        render: (value) => renderLink(value, setParams, 'departments'),
      },
      { key: 'role', render: (value) => ruRole[value as ERole] },
    ],
    actions: ['edit', 'delete'],
  },
  formFields: [
    { name: 'surname', rules: stringRules },
    { name: 'name', rules: stringRules, label: 'Имя' },
    { name: 'middlename', rules: stringRules, optional: true },
    { name: 'department_id', getFn: departmentApi.getDictionaries },
    {
      name: 'role',
      getFn: [
        'get roles',
        async () =>
          createRoles.map(
            (roleKey) =>
              ({
                label: ruRole[roleKey],
                value: roleKey,
              }) as IOption,
          ),
      ],
    },
  ],
};
