import { $api } from '../../shared/api';
import { ISpeciality } from './types';
import { IResponse, TGetDictionaryQuery, TGetQuery } from '../../shared/types';

const urls = {
  base: '/specialities',
};

const keys = {
  get: 'get specialities',
};

async function get() {
  return $api.get<IResponse<ISpeciality[]>>(urls.base);
}

async function getDict() {
  try {
    const res = await get();
    return res.data.data.map((speciality) => ({
      label: speciality.name,
      value: speciality.id,
    }));
  } catch {
    return [];
  }
}

export const specialityApi = {
  get: [keys.get, get] as TGetQuery<ISpeciality>,
  getDictionaries: [keys.get, getDict] as TGetDictionaryQuery,
};
