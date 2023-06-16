import { useMutation } from '@tanstack/react-query';
import authApi from '../service/auth-api';
import { LoginValues, ResponseLogin } from '../service/type';
import useAuthStore from './use-auth-store';
import { useApp } from '@/hooks';

export const useLoginMutation = () => {
  return useMutation<ResponseLogin, unknown, LoginValues, unknown>({
    mutationFn: authApi.login,
  });
};

export const useLogoutMutation = () => {
  const { message } = useApp();
  const logout = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      void message.error('Đã đăng xuất tài khoản');
      logout();
    },
  });
};
