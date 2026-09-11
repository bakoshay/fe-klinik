<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="bg-primary-light rounded-md shadow-md flex flex-col md:flex-row max-w-72 lg:w-full md:max-w-3xl p-2"
    >
      <!-- Gambar kiri -->
      <img
        src="/images/login-banner.jpg"
        alt="auth-banner"
        class="lg:h-[500px] md:h-[400px] w-1/2 object-cover hidden md:block"
      />
      <!-- Form kanan -->
      <div class="flex flex-col justify-center items-center flex-1 p-2 md:p-8 w-full gap-6">
        <div class="flex flex-col items-center justify-center gap-1 w-full">
          <img src="/images/logo.png" alt="logo" class="md:w-20 w-16" />
          <h2 class="font-bold md:text-2xl text-xl text-center">KLINIK VIRJA MEDIKA</h2>
        </div>
        <form class="w-full items-start flex flex-col gap-3" @submit.prevent="handleLogin">
          <div class="flex flex-col items-start w-full gap-1">
            <label class="text-xs font-semibold" for="username">Username</label>
            <InputText
              id="username"
              v-model="form.username"
              fluid
              type="text"
              size="small"
              placeholder="Masukan username"
              :class="{ 'p-invalid': validation.hasError('username') }"
              @blur="validation.touch('username')"
              @input="validation.validate('username', form.username)"
            />
            <small v-if="validation.getError('username')" class="text-red-500">
              {{ validation.getError('username') }}
            </small>
          </div>
          <div class="flex flex-col items-start w-full gap-1">
            <label class="text-xs font-semibold" for="password">Password</label>
            <InputText
              id="password"
              v-model="form.password"
              type="password"
              fluid
              size="small"
              placeholder="Masukan password"
              :class="{ 'p-invalid': validation.hasError('password') }"
              @blur="validation.touch('password')"
              @input="validation.validate('password', form.password)"
            />
            <small v-if="validation.getError('password')" class="text-red-500">
              {{ validation.getError('password') }}
            </small>
          </div>
          <BaseButton class="w-full" size="sm" type="submit" :disabled="loading">
            <template #default>
              <span v-if="loading" class="flex items-center gap-2">
                <Icon class="animate-spin h-5 w-5 inline" name="lucide:loader" />
                Loading...
              </span>
              <span v-else>Masuk</span>
            </template>
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/api/useAuth';
import { loginValidation } from '@/validations';

const loading = ref(false);
const router = useRouter();
const toast = useToast();
const validation = useValidation(loginValidation);
const { login } = useAuth();
const { setCookie } = useCookieManager();

const form = ref({
  username: '',
  password: '',
});

const resetForm = () => {
  form.value.username = '';
  form.value.password = '';
  validation.reset();
};

const handleLogin = async () => {
  if (!validation.validateAll(form.value)) return;

  loading.value = true;

  try {
    const payload = {
      username: form.value.username,
      password: form.value.password,
    };

    const response = await login(payload);
    setCookie('token', response.data.value?.data.token ?? '');
    toast.add({
      severity: 'success',
      summary: 'Successful',
      detail: response.data.value?.message || 'Login successful',
      life: 3000,
    });

    resetForm();
    router.push({ path: '/' });
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'Login failed',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>
