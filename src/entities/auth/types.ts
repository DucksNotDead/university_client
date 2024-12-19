import { IUser, TUserCredits } from '../user/types';

export interface IAuthContextValue {
  login: { fn: (credits: TUserCredits) => void; isPending: boolean };
  logout: { fn: () => void; isPending: boolean };
  user: IUser | null;
}
