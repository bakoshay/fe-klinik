import type { ValidationRules } from '@/types/validation';

export const antrianValidation: ValidationRules = {
  nama: {
    required: 'Nama tidak boleh kosong',
    minLength: { value: 3, message: 'Nama minimal 3 karakter' },
  },
  nik: {
    required: 'NIK tidak boleh kosong',
    numeric: 'NIK hanya boleh berisi angka',
    minLength: { value: 16, message: 'NIK harus 16 digit' },
    maxLength: { value: 16, message: 'NIK harus 16 digit' },
  },
  jenis_kelamin: {
    required: 'Jenis kelamin harus dipilih',
  },
  keluhan: {
    required: 'Keluhan tidak boleh kosong',
    minLength: { value: 5, message: 'Keluhan minimal 5 karakter' },
  },
};
