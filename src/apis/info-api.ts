import { DataUserDetailQuery } from '@/features/user';
import axiosClient from './axios-client';

const infoApi = (): Promise<DataUserDetailQuery> =>
  axiosClient.get('profiles/infor');

export default infoApi;
