import type { ValidationRules } from '@/types/validation';

export const pembayaranValidation: ValidationRules = {
  nomor_urut: {
    required: 'Nomor urut harus dipilih',
  },
  jenis_pembayaran: {
    required: 'Jenis pembayaran harus dipilih',
  },
};
