import { create } from 'zustand';

type AuthStore = {
  token?: string;
  login: (_token: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  token: localStorage.getItem('token') || undefined,
  login: (token) => {
    localStorage.setItem('token', token);
    set({
      token,
    });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: undefined });
  },
}));

export default useAuthStore;
