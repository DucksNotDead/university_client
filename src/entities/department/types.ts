import { IDictionary } from '../../shared/types';

export interface IDepartment extends IDictionary {
  faculty_id: number;
  head_id: number | null;
}
