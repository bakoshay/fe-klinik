import type {
  DokterResponse,
  DokterByIdResponse,
  DokterSimpleResponse,
  FormDokter,
} from '@/types/dokter';

export const useDokter = () => {
  const api = useApi();

  return {
    getAll: (q?: string) => api.get<DokterResponse>(`/dokters?search=${q}`),
    getById: (id: string) => api.get<DokterByIdResponse>(`/dokters/${id}`),
    getByDay: (day: string) => api.get<DokterResponse>(`/dokters/hari?day=${day}`, false),
    createDokter: (data: FormDokter) => api.post<DokterSimpleResponse>('/dokters', data),
    updateDokter: (id: string, data: FormDokter) =>
      api.put<DokterSimpleResponse>(`/dokters/${id}`, data),
    deleteDokter: (id: string) => api.del<DokterSimpleResponse>(`/dokters/${id}`),
  };
};
