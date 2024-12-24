import { IIdentifiable } from '../../shared/types';
import { IStandard } from '../standard/types';
import { EStudyType } from '../../shared/studyTypes';

interface ISyllabusBase {
  aims: string;
  competencies: string;
  requirements: string;
  position_in_scheme: string;
  year: number;
}

export type ISyllabus = IIdentifiable &
  ISyllabusBase & {
    discipline_name: string;
    standard_id: number;
    approved: boolean;
    department_head_id: number;
  };

interface ILoad {
  semester: number;
  type: EStudyType;
  total_hours: number;
}

export type ISyllabusReportInfo = ISyllabusBase &
  Pick<IStandard, 'themes' | 'contents'> & {
    name: string;
    loads: ILoad[];
  };
