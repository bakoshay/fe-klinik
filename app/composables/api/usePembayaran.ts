import type { Pembayaran, PembayaranResponse } from '@/types/pembayaran';

export const usePembayaran = () => {
  const api = useApi();

  return {
    createPembayaran: (data: Pembayaran) => api.post<PembayaranResponse>('/pembayarans', data),
  };
};
