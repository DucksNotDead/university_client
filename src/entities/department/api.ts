import { $api } from '../../shared/api';
import { IDepartment } from './types';
import { IResponse, TGetDictionaryQuery, TGetQuery } from '../../shared/types';

const urls = {
  base: '/departments',
};

const keys = {
  get: 'get departments',
};

async function get() {
  return $api.get<IResponse<IDepartment[]>>(urls.base);
}

async function getDict() {
  try {
    const res = await get();
    return res.data.data.map((department) => ({
      label: department.name,
      value: department.id,
    }));
  } catch {
    return [];
  }
}

export const departmentApi = {
  get: [keys.get, get] as TGetQuery<IDepartment>,
  getDictionaries: [keys.get, getDict] as TGetDictionaryQuery,
};
