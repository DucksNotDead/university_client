import { IIdentifiable } from '../../shared/types';

export interface IStudyPlan extends IIdentifiable {
  speciality_id: number;
  year: number;
  description: string;
}
