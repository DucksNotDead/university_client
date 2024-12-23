import { IIdentifiable } from '../../shared/types';

export interface IAcademicLoad extends IIdentifiable {
  speciality_id: number;
  discipline_id: number;
  volume: number;
}
