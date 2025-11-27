import type { AuthLoginForm, LoginResponse } from '@/types/auth';

export const useAuth = () => {
  const api = useApi();
  const router = useRouter();
  const { clearAllCookies } = useCookieManager();

  const logOut = () => {
    clearAllCookies();
    router.push('/login');
  };

  return {
    login: (data: AuthLoginForm) => api.post<LoginResponse>('/auth/login', data, false),
    logOut,
  };
};
