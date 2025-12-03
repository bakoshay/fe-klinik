import type { ValidationRules } from '@/types/validation';

export const dokterValidation: ValidationRules = {
  name: {
    required: 'Nama dokter tidak boleh kosong',
  },
  gender: {
    required: 'Jenis kelamin harus dipilih',
  },
  phone: {
    required: 'Nomor telepon tidak boleh kosong',
    numeric: 'Nomor telepon hanya boleh berisi angka',
    minLength: { value: 10, message: 'Nomor telepon minimal 10 digit' },
    maxLength: { value: 13, message: 'Nomor telepon maksimal 13 digit' },
  },
  address: {
    required: 'Alamat tidak boleh kosong',
  },
};
