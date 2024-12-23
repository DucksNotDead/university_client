import { $api } from '../../shared/api';
import { IStandard } from './types';
import { IResponse, TGetDictionaryQuery, TGetQuery } from '../../shared/types';

const urls = {
  base: '/standards',
};

const keys = {
  get: 'get standards',
};

async function get() {
  return $api.get<IResponse<IStandard[]>>(urls.base);
}

async function getDict() {
  try {
    const res = await get();
    return res.data.data.map((standard) => ({
      label: standard.id,
      value: standard.id,
    }));
  } catch {
    return [];
  }
}

export const standardsApi = {
  get: [keys.get, get] as TGetQuery<IStandard>,
  getDictionaries: [keys.get, getDict] as TGetDictionaryQuery,
};
