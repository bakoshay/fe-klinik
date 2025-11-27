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
        const token = useCookie('token').value;
        if (token) headers['Authorization'] = `Bearer ${token}`;
      }

      const result = await $fetch<T>(url, {
        baseURL: config.public.apiBaseUrl,
        method: options?.method || 'GET',
        body: options?.body,
        headers,
        onRequestError({ response }) {
          if (response?.status === 401) {
            useCookie('token').value = null;
            window.location.href = '/login';
          }
        },
      });

      data.value = result;
    } catch (err: any) {
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
