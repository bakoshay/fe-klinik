import type { AuthLoginForm, LoginResponse } from '@/types/auth';

export const useUseAuth = () => {
  const api = useApi();

  return {
    login: (data: AuthLoginForm) => api.post<LoginResponse>('/auth/login', data, false),
  };
};
