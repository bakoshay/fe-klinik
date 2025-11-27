export const useApi = () => {
  const config = useRuntimeConfig();

  const request = async <T>(
    url: string,
    options?: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      headers?: HeadersInit;
      auth?: boolean;
    }
  ) => {
    const data = ref<T | null>(null);
    const error = ref<any>(null);
    const pending = ref<boolean>(true);
    const tokenCookie = useCookie('token');

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options?.headers &&
        !Array.isArray(options.headers) &&
        typeof options.headers === 'object'
          ? (options.headers as Record<string, string>)
          : {}),
      };

      if (options?.auth) {
        const token = tokenCookie.value;
        if (token) headers['Authorization'] = `Bearer ${token}`;
      }

      const result = await $fetch<T>(url, {
        baseURL: config.public.apiBaseUrl,
        method: options?.method || 'GET',
        body: options?.body,
        headers,
        onResponseError({ response }) {
          if (response.status === 401) {
            tokenCookie.value = null;
          }
        },
      });

      data.value = result;
    } catch (err: any) {
      // Handle 401 di catch block juga
      if (err?.status === 401 || err?.statusCode === 401 || err?.response?.status === 401) {
        tokenCookie.value = null;
      }

      error.value = err?.data?.message || err?.message || 'Error';
    } finally {
      pending.value = false;
    }

    return { data, pending, error };
  };

  return {
    get: <T>(url: string, auth = true) => request<T>(url, { method: 'GET', auth }),
    post: <T>(url: string, body?: any, auth = true) =>
      request<T>(url, { method: 'POST', body, auth }),
    put: <T>(url: string, body?: any, auth = true) =>
      request<T>(url, { method: 'PUT', body, auth }),
    del: <T>(url: string, auth = true) => request<T>(url, { method: 'DELETE', auth }),
  };
};
