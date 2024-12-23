import { IIdentifiable } from '../../shared/types';

export interface ISyllabusCommonInfo extends IIdentifiable {
  discipline_id: number;
  discipline_name: string;
  standard_id: number;
}

export interface ISyllabus extends ISyllabusCommonInfo {
  aims: string;
  competencies: string;
  requirements: string;
  position_in_scheme: string;
}
