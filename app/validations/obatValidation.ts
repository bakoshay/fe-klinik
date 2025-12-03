import type { ValidationRules } from '@/types/validation';

export const obatValidation: ValidationRules = {
  nama: {
    required: 'Nama obat tidak boleh kosong',
  },
  jenis: {
    required: 'Jenis obat tidak boleh kosong',
  },
  harga: {
    required: 'Harga obat tidak boleh kosong',
    numeric: 'Harga obat hanya boleh berisi angka',
  },
};
