import type { ValidationRules } from '@/types/validation';

export const useValidation = (rules: ValidationRules) => {
  const errors = reactive<Record<string, string>>({});
  const touched = reactive<Record<string, boolean>>({});

  const validate = (field: string, value: any): boolean => {
    const rule = rules[field];
    if (!rule) return true;

    let errorMessage = '';

    // Required validation
    if (rule.required) {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errorMessage =
          typeof rule.required === 'string'
            ? rule.required
            : `${field.charAt(0).toUpperCase() + field.slice(1)} tidak boleh kosong`;
      }
    }

    // MinLength validation
    if (!errorMessage && rule.minLength && value) {
      const minLength = typeof rule.minLength === 'number' ? rule.minLength : rule.minLength.value;
      const message = typeof rule.minLength === 'object' ? rule.minLength.message : undefined;

      if (value.length < minLength) {
        errorMessage = message || `Minimal ${minLength} karakter`;
      }
    }

    // MaxLength validation
    if (!errorMessage && rule.maxLength && value) {
      const maxLength = typeof rule.maxLength === 'number' ? rule.maxLength : rule.maxLength.value;
      const message = typeof rule.maxLength === 'object' ? rule.maxLength.message : undefined;

      if (value.length > maxLength) {
        errorMessage = message || `Maksimal ${maxLength} karakter`;
      }
    }

    // Email validation
    if (!errorMessage && rule.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = typeof rule.email === 'string' ? rule.email : 'Format email tidak valid';
      }
    }

    // Numeric validation
    if (!errorMessage && rule.numeric && value) {
      const numericRegex = /^\d+$/;
      if (!numericRegex.test(value)) {
        errorMessage = typeof rule.numeric === 'string' ? rule.numeric : 'Hanya boleh berisi angka';
      }
    }

    // Pattern validation
    if (!errorMessage && rule.pattern && value) {
      if (!rule.pattern.value.test(value)) {
        errorMessage = rule.pattern.message || 'Format tidak valid';
      }
    }

    // Custom validation
    if (!errorMessage && rule.custom && value) {
      const result = rule.custom(value);
      if (result !== true) {
        errorMessage = typeof result === 'string' ? result : 'Validasi tidak valid';
      }
    }

    if (errorMessage) {
      errors[field] = errorMessage;
      return false;
    } else {
      delete errors[field];
      return true;
    }
  };

  const validateAll = (formData: Record<string, any>): boolean => {
    let isValid = true;
    Object.keys(rules).forEach((field) => {
      const fieldValid = validate(field, formData[field]);
      touched[field] = true;
      if (!fieldValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  const touch = (field: string) => {
    touched[field] = true;
  };

  const reset = () => {
    Object.keys(errors).forEach((key) => delete errors[key]);
    Object.keys(touched).forEach((key) => delete touched[key]);
  };

  const getError = (field: string) => {
    return touched[field] ? errors[field] : undefined;
  };

  const hasError = (field: string) => {
    return touched[field] && !!errors[field];
  };

  const isValid = computed(() => {
    return Object.keys(errors).length === 0;
  });

  return {
    errors,
    touched,
    validate,
    validateAll,
    touch,
    reset,
    getError,
    hasError,
    isValid,
  };
};
