import axiosClient from '@/apis/axios-client';
import { ListData } from '@/ts/types';

const baseUrl = 'posts-categories/type';

const postCategoryApi = {
  getList: (
    type: number
  ): Promise<
    ListData<{
      id: number;
      name: string;
    }>
  > =>
    axiosClient.get(baseUrl, {
      params: {
        type,
      },
    }),
};

export default postCategoryApi;
