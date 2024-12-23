import { IIdentifiable } from '../../shared/types';

export interface IStandard extends IIdentifiable {
  discipline_id: number;
  themes: string;
  contents: string;
}
