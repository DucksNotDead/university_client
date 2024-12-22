import { $api } from '../../shared/api';
import { IPagination, IResponse } from '../../shared/types';
import { ISyllabus } from './types';

const urls = {
  base: '/syllabuses',
};

export const syllabusApi = {
  get() {
    return $api.post<IResponse<ISyllabus[]>>(urls.base);
  },
};
