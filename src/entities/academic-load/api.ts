import { $api } from '../../shared/api';
import { IAcademicLoad } from './types';
import { IResponse, TGetQuery } from '../../shared/types';

const urls = {
  base: '/academic-loads',
};

const keys = {
  get: 'get academic loads',
};

async function get() {
  return $api.get<IResponse<IAcademicLoad[]>>(urls.base);
}

export const academicLoadApi = {
  get: [keys.get, get] as TGetQuery<IAcademicLoad>,
};
