import { $api } from '../../shared/api';
import { IFaculty } from './types';
import { IResponse, TGetDictionaryQuery, TGetQuery } from '../../shared/types';

const urls = {
  base: '/faculties',
};

const keys = {
  get: 'get faculties',
};

async function get() {
  return $api.get<IResponse<IFaculty[]>>(urls.base);
}

async function getDict() {
  try {
    const res = await get();
    return res.data.data.map((faculty) => ({
      label: faculty.name,
      value: faculty.id,
    }));
  } catch {
    return [];
  }
}

export const facultyApi = {
  get: [keys.get, get] as TGetQuery<IFaculty>,
  getDictionaries: [keys.get, getDict] as TGetDictionaryQuery,
};
