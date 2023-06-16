import axiosClient from '@/apis/axios-client';
import { LoginValues, ResponseLogin } from './type';

const baseUrl = 'auth';

const authApi = {
  login: (data: LoginValues): Promise<ResponseLogin> =>
    axiosClient.post(`${baseUrl}/sign-in`, data),
  logout: () => axiosClient.post(`${baseUrl}/logout`),
};

export default authApi;
