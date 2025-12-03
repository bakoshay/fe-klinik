import type { ValidationRules } from '@/types/validation';

export const loginValidation: ValidationRules = {
  username: {
    required: 'Username tidak boleh kosong',
  },
  password: {
    required: 'Password tidak boleh kosong',
  },
};
