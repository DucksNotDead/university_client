import { $api } from '../../shared/api';
import { IResponse, TGetQuery } from '../../shared/types';
import { ISyllabus } from './types';

const urls = {
  base: '/syllabuses',
};

const keys = {
  get: 'get syllabuses',
};

async function get() {
  return $api.get<IResponse<ISyllabus[]>>(urls.base);
}

export const syllabusApi = {
  get: [keys.get, get] as TGetQuery<ISyllabus>,
};
