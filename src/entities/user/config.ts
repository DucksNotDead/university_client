import { IOption, IViewConfig } from '../../shared/types';
import { IUser } from './types';
import { userApi } from './api';
import { renderLink } from '../../shared/utils';
import { createRoles, ERole, ruRole } from '../../shared/roles';
import { stringRules } from '../../shared/common';

export const userConfig: IViewConfig<IUser> = {
  header: { title: 'Пользователи' },
  serviceEntityName: 'пользователя',
  entityTitle: { key: 'id', prefix: 'Пользователь' },
  getFn: userApi.get,
  table: {
    columns: (setParams) => [
      { key: 'id', render: (value) => renderLink(value, setParams) },
      { key: 'fio' },
      { key: 'role', render: (value) => ruRole[value as ERole] },
    ],
    actions: ['edit', 'delete'],
  },
  formFields: [
    { name: 'fio', rules: stringRules },
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
