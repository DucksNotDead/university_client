import { ERole } from '../../shared/roles';
import { IIdentifiable } from '../../shared/types';

interface IUserLogin {
  login: string;
}

interface IUserPassword {
  password: string;
}

export interface IUser extends IIdentifiable {
  fio: string;
  role: ERole;
}

export type TUserCredits = IUserLogin & IUserPassword;

export type TUserCreateDto = Omit<IUser, 'id'> & IUserPassword;

export type TUserUpdateDto = Partial<TUserCreateDto> & IIdentifiable;
