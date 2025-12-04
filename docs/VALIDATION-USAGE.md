# Panduan Penggunaan useValidation Composable

Composable `useValidation` adalah utility yang sangat mudah dan reusable untuk validasi form di Nuxt 3.

## Fitur Validasi

- **required**: Field wajib diisi
- **minLength**: Minimal karakter
- **maxLength**: Maksimal karakter
- **email**: Format email valid
- **numeric**: Hanya angka
- **pattern**: Custom regex pattern
- **custom**: Custom validation function

## Cara Penggunaan

### 1. Import Composable

```typescript
import { useValidation } from '@/composables/useValidation';
```

### 2. Setup Validation Rules

```typescript
const validation = useValidation({
  nama: {
    required: 'Nama tidak boleh kosong',
    minLength: { value: 3, message: 'Nama minimal 3 karakter' },
  },
  email: {
    required: true, // akan generate pesan default
    email: 'Format email tidak valid',
  },
  nik: {
    required: 'NIK wajib diisi',
    numeric: 'NIK hanya boleh berisi angka',
    minLength: { value: 16, message: 'NIK harus 16 digit' },
    maxLength: { value: 16, message: 'NIK harus 16 digit' },
  },
});
```

### 3. Binding ke Form

```vue
<template>
  <div class="flex flex-col gap-1">
    <label>Nama Lengkap</label>
    <InputText
      v-model="form.nama"
      :class="{ 'p-invalid': validation.hasError('nama') }"
      @blur="validation.touch('nama')"
      @input="validation.validate('nama', form.nama)"
    />
    <small v-if="validation.getError('nama')" class="text-red-500">
      {{ validation.getError('nama') }}
    </small>
  </div>
</template>
```

### 4. Validate Saat Submit

```typescript
const handleSubmit = async () => {
  // Validasi semua field sekaligus
  if (!validation.validateAll(form.value)) {
    toast.add({
      severity: 'warn',
      summary: 'Perhatian',
      detail: 'Mohon lengkapi form dengan benar',
      life: 3000,
    });
    return;
  }

  // Lanjut proses submit...
};
```

### 5. Reset Validation

```typescript
const resetForm = () => {
  form.value = { nama: '', email: '' };
  validation.reset(); // Reset semua error dan touched state
};
```

## Contoh Lengkap

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Nama Field -->
    <div class="flex flex-col gap-1">
      <label>Nama</label>
      <InputText
        v-model="form.nama"
        :class="{ 'p-invalid': validation.hasError('nama') }"
        @blur="validation.touch('nama')"
        @input="validation.validate('nama', form.nama)"
      />
      <small v-if="validation.getError('nama')" class="text-red-500">
        {{ validation.getError('nama') }}
      </small>
    </div>

    <!-- Email Field -->
    <div class="flex flex-col gap-1">
      <label>Email</label>
      <InputText
        v-model="form.email"
        :class="{ 'p-invalid': validation.hasError('email') }"
        @blur="validation.touch('email')"
        @input="validation.validate('email', form.email)"
      />
      <small v-if="validation.getError('email')" class="text-red-500">
        {{ validation.getError('email') }}
      </small>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { useValidation } from '@/composables/useValidation';

const form = ref({
  nama: '',
  email: '',
});

const validation = useValidation({
  nama: {
    required: 'Nama tidak boleh kosong',
    minLength: { value: 3, message: 'Nama minimal 3 karakter' },
  },
  email: {
    required: 'Email tidak boleh kosong',
    email: 'Format email tidak valid',
  },
});

const handleSubmit = () => {
  if (!validation.validateAll(form.value)) {
    return;
  }
  // Submit logic...
};
</script>
```

## API Methods

- `validate(field, value)`: Validasi satu field
- `validateAll(formData)`: Validasi semua field sekaligus
- `touch(field)`: Tandai field sudah di-touch
- `reset()`: Reset semua error dan touched state
- `getError(field)`: Dapatkan error message untuk field
- `hasError(field)`: Check apakah field punya error
- `isValid`: Computed property untuk check apakah form valid

## Custom Validation

```typescript
const validation = useValidation({
  password: {
    required: 'Password wajib diisi',
    custom: (value) => {
      if (value.length < 8) return 'Password minimal 8 karakter';
      if (!/[A-Z]/.test(value)) return 'Harus ada huruf besar';
      if (!/[0-9]/.test(value)) return 'Harus ada angka';
      return true;
    },
  },
});
```

## Pattern Validation

```typescript
const validation = useValidation({
  handphone: {
    required: 'No HP wajib diisi',
    pattern: {
      value: /^08[0-9]{8,11}$/,
      message: 'Format no HP tidak valid (08xxxxxxxxxx)',
    },
  },
});
```

---

## Struktur Folder untuk Validations

Untuk menjaga kode tetap rapi dan terorganisir, pisahkan validasi rules ke folder terpisah:

### Struktur Folder

```
app/
├── validations/
│   ├── index.ts                  # Export semua validations
│   ├── antrianValidation.ts      # Validasi form antrian
│   ├── dokterValidation.ts       # Validasi form dokter
│   ├── pasienValidation.ts       # Validasi form pasien
│   └── loginValidation.ts        # Validasi form login
```

### Contoh File Validation

**app/validations/antrianValidation.ts**
```typescript
import type { ValidationRules } from '@/composables/useValidation';

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
    minLength: { value: 10, message: 'Keluhan minimal 10 karakter' },
  },
};
```

**app/validations/index.ts**
```typescript
export { antrianValidation } from './antrianValidation';
export { dokterValidation } from './dokterValidation';
export { pasienValidation } from './pasienValidation';
```

### Cara Menggunakan di Komponen

```vue
<script setup lang="ts">
import { useValidation } from '@/composables/useValidation';
import { antrianValidation } from '@/validations/antrianValidation';
// atau
import { antrianValidation } from '@/validations';

const form = ref({
  nama: '',
  nik: '',
  jenis_kelamin: '',
  keluhan: '',
});

const validation = useValidation(antrianValidation);
</script>
```

### Keuntungan Struktur Ini

1. **Reusable**: Validasi bisa dipakai di multiple komponen
2. **Maintainable**: Mudah update validasi di satu tempat
3. **Organized**: Semua validasi terkumpul di satu folder
4. **Type-safe**: TypeScript akan memberikan autocomplete dan type checking
5. **Clean Code**: Komponen lebih bersih tanpa validasi rules yang panjang

### Contoh Validasi Lainnya

**dokterValidation.ts**
```typescript
export const dokterValidation: ValidationRules = {
  nama: {
    required: 'Nama dokter tidak boleh kosong',
    minLength: { value: 3, message: 'Nama minimal 3 karakter' },
  },
  spesialis: {
    required: 'Spesialis harus dipilih',
  },
  handphone: {
    required: 'No HP tidak boleh kosong',
    pattern: {
      value: /^08[0-9]{8,11}$/,
      message: 'Format no HP tidak valid (08xxxxxxxxxx)',
    },
  },
};
```

**loginValidation.ts**
```typescript
export const loginValidation: ValidationRules = {
  email: {
    required: 'Email tidak boleh kosong',
    email: 'Format email tidak valid',
  },
  password: {
    required: 'Password tidak boleh kosong',
    minLength: { value: 6, message: 'Password minimal 6 karakter' },
  },
};
```
