import { IUser, TUserCredits } from '../user/types';
import { $api } from '../../shared/api';

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
    return await $api.post<IUser>(urls.base);
  },
  async login(credits: TUserCredits) {
    return await $api.post<IUser>(urls.login(), credits);
  },
  async logout() {
    return await $api.post(urls.logout());
  },
};
