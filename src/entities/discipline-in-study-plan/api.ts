import { $api } from '../../shared/api';
import { IDisciplineInStudyPlan } from './types';
import { IResponse, TGetQuery } from '../../shared/types';

const urls = {
  base: '/disciplines-in-study-plans',
};

const keys = {
  get: 'get discipline in study plan',
};

async function get() {
  return $api.get<IResponse<IDisciplineInStudyPlan[]>>(urls.base);
}

export const disciplineInStudyPlanApi = {
  get: [keys.get, get] as TGetQuery<IDisciplineInStudyPlan>,
};
