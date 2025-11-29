import type { ObatByIdResponse, ObatResponse, FormObat, ObatSimpleResponse } from '@/types/obat';

export const useObat = () => {
  const api = useApi();

  return {
    getAll: (q?: string) => api.get<ObatResponse>(`/obats?search=${q}`),
    getByAvailable: () => api.get<ObatByIdResponse>(`/obats/available`),
    createObat: (data: FormObat) => api.post<ObatSimpleResponse>('/obats', data),
    updateObat: (id: string, data: FormObat) => api.put<ObatSimpleResponse>(`/obats/${id}`, data),
    deleteObat: (id: string) => api.del<ObatSimpleResponse>(`/obats/${id}`),
  };
};
