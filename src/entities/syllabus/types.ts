import { IContent, IIdentifiable } from '../../shared/types';

export interface ISyllabusCommonInfo extends IIdentifiable {
  discipline_id: number;
  discipline_name: string;
  standard_id: number;
}

export interface ISyllabus extends ISyllabusCommonInfo {
  aims?: string;
  competencies?: string;
  requirements?: string;
  position_in_scheme?: string;
  contents?: string;
  items: ISyllabus[];
}

export interface ISyllabusExtended extends Omit<ISyllabus, 'contents'> {
  contents: IContent[];
}

export interface ISyllabusFilterConfig extends Omit<ISyllabusCommonInfo, 'id'> {}
