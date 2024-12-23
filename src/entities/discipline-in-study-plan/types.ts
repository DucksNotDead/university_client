import { IIdentifiable } from '../../shared/types';
import { EStudyType } from '../../shared/studyTypes';

export interface IDisciplineInStudyPlan extends IIdentifiable {
  discipline_id: number;
  study_plan_id: number;
  semester: number;
  type: EStudyType;
  hours: number;
}
