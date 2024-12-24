import { $api } from '../../shared/api';
import { IUser } from './types';
import { IResponse, TGetDictionaryQuery, TGetQuery } from '../../shared/types';
import { ruRole } from '../../shared/roles';

const urls = {
  base: '/users',
};

const keys = {
  get: 'get users',
};

async function get() {
  return $api.get<IResponse<IUser[]>>(urls.base);
}

async function getDict() {
  try {
    const res = await get();
    return res.data.data.map(({ fio, role, id }) => ({
      label: `${fio} (${ruRole[role]})`,
      value: id,
    }));
  } catch {
    return [];
  }
}

export const userApi = {
  get: [keys.get, get] as TGetQuery<IUser>,
  getDictionaries: [keys.get, getDict] as TGetDictionaryQuery,
};
