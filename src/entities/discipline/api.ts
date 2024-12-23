import { $api } from '../../shared/api';
import { IOption, IResponse, TGetDictionaryQuery, TGetQuery } from '../../shared/types';
import { IDiscipline } from './types';

const urls = {
  base: '/disciplines',
};

const keys = {
  get: 'get disciplines',
};

async function get() {
  return $api.get<IResponse<IDiscipline[]>>(urls.base);
}

async function getDict(): Promise<IOption[]> {
  try {
    const res = await get();
    return res.data.data.map((discipline) => ({
      label: discipline.name,
      value: discipline.id,
    }));
  } catch {
    return [];
  }
}

export const disciplineApi = {
  get: [keys.get, get] as TGetQuery<IDiscipline>,
  getDictionaries: [keys.get, getDict] as TGetDictionaryQuery,
};
