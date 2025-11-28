import type { AntrianForm, AntrianResponse } from '@/types/antrian';

export const useAntrian = () => {
  const api = useApi();

  return {
    createAntrian: (data: AntrianForm) => api.post<AntrianResponse>('/antrians', data, false),
    getCurrentAntrian: () => api.get<AntrianResponse>('/antrians'),
    nextAntrian: () => api.post<AntrianResponse>('/antrians/next'),
  };
};
