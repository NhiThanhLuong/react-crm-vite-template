import { USER_PATH } from '@/data/constant';
import { useApp } from '@/hooks';
import { QueryOptions } from '@/ts/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DataUser, DataUserListQuery, UserListParams } from '../services/type';
import userApi from '../services/user-api';

const users = createQueryKeys('users', {
  list: (params: UserListParams) => ({
    queryKey: [params],
    queryFn: () => userApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => userApi.getDetail(id),
  }),
});

export const useUserListQuery = (
  params: UserListParams = {},
  options: QueryOptions<DataUserListQuery> = {}
) => {
  return useQuery({
    ...users.list(params),
    keepPreviousData: true,
    ...options,
  });
};

export const useUserDetailQuery = (
  id: number,
  options: QueryOptions<DataUser> = {}
) => {
  return useQuery({
    ...users.detail(id),
    ...options,
  });
};

export const useUpdateUserMutation = (id: number) => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.update(id),
    onSuccess: () => {
      void message.success('Cập nhật thông tin người dùng thành công');
      void queryClient.invalidateQueries(users.detail(id).queryKey);
    },
    onError: () => {
      void message.error('Cập nhật người dùng thất bại');
    },
  });
};

export const useAddUserMutation = () => {
  const { message } = useApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: userApi.add,
    onSuccess: () => {
      void message.success('Tạo người dùng thành công');
      void queryClient.invalidateQueries(users.list._def);
      navigate(USER_PATH);
    },
    onError: () => {
      void message.error('Tạo người dùng thất bại');
    },
  });
};

export const useInfoQuery = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: userApi.getInfoMe,
  });
};
