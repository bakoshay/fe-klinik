export const useApi = () => {
  const config = useRuntimeConfig();

  const request = async <T>(
    url: string,
    options?: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      headers?: HeadersInit;
    }
  ) => {
    const data = ref<T | null>(null);
    const error = ref<any>(null);
    const pending = ref<boolean>(true);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      };

      const result = await $fetch<T>(url, {
        baseURL: config.public.apiBaseUrl,
        method: options?.method || 'GET',
        body: options?.body,
        headers,
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
    get: <T>(url: string) => request<T>(url, { method: 'GET' }),
    post: <T>(url: string, body?: any) => request<T>(url, { method: 'POST', body }),
    put: <T>(url: string, body?: any) => request<T>(url, { method: 'PUT', body }),
    del: <T>(url: string) => request<T>(url, { method: 'DELETE' }),
  };
};
