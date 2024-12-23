import { $api } from '../../shared/api';
import { IStudyPlan } from './types';
import { IResponse, TGetDictionaryQuery, TGetQuery } from '../../shared/types';

const urls = {
  base: '/study-plans',
};

const keys = {
  get: 'get study plans',
};

async function get() {
  return $api.get<IResponse<IStudyPlan[]>>(urls.base);
}

async function getDict() {
  try {
    const res = await get();
    return res.data.data.map((studyPlan) => ({
      label: `${studyPlan.id} (${studyPlan.year})`,
      value: studyPlan.id,
    }));
  } catch {
    return [];
  }
}

export const studyPlanApi = {
  get: [keys.get, get] as TGetQuery<IStudyPlan>,
  getDictionaries: [keys.get, getDict] as TGetDictionaryQuery,
};
