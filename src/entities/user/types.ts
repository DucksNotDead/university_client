import { ERole } from '../../shared/roles';
import { IDictionary, IIdentifiable } from '../../shared/types';

interface IUserLogin {
  login: string;
}

interface IUserPassword {
  password: string;
}

export interface IUser extends IDictionary {
  surname: string;
  middlename: string | null;
  role: ERole;
  department_id: number | null;
}

export type TUserCredits = IUserLogin & IUserPassword;

export type TUserCreateDto = Omit<IUser, 'id'> & IUserPassword;

export type TUserUpdateDto = Partial<TUserCreateDto> & IIdentifiable;
