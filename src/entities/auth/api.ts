import { IUser, TUserCredits } from '../user/types';
import { $api } from '../../shared/api';
import { IResponse } from '../../shared/types';

const urls = {
  base: `/auth`,
  login() {
    return `${this.base}/login`;
  },
  logout() {
    return `${this.base}/logout`;
  },
};

export const authApi = {
  async authenticate() {
    return await $api.post<IResponse<IUser>>(urls.base);
  },
  async login(credits: TUserCredits) {
    return await $api.post<IResponse<{ user: IUser; token: string }>>(
      urls.login(),
      credits,
    );
  },
  async logout() {
    return await $api.post(urls.logout());
  },
};
