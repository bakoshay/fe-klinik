export interface ValidationRule {
  required?: boolean | string;
  minLength?: number | { value: number; message?: string };
  maxLength?: number | { value: number; message?: string };
  email?: boolean | string;
  numeric?: boolean | string;
  pattern?: { value: RegExp; message?: string };
  custom?: (value: any) => boolean | string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}
