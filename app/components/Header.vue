<template>
  <header class="fixed top-0 left-0 right-0 w-full bg-primary px-6 py-4 shadow-md z-50">
    <nav class="flex justify-between items-center w-full">
      <!-- logo -->
      <div class="flex items-center gap-2">
        <img src="/images/logo.png" alt="Logo" class="size-9" />
        <h1 class="text-primary-dark font-extrabold text-lg">KLINIK VIRZA MEDIKA</h1>
      </div>

      <!-- antrian -->
      <div v-if="token" class="flex items-center gap-1">
        <div class="flex py-2 px-4 items-center bg-primary-light rounded-lg">
          <p class="font-bold">{{ antrian ?? '' }}</p>
        </div>

        <button
          @click="handleNextAntrian"
          v-if="data?.status"
          class="flex items-center rounded-lg cursor-pointer hover:shadow-md transition-shadow"
        >
          <Icon name="lucide:chevron-right" size="25" />
        </button>
      </div>

      <!-- login -->
      <NuxtLink
        v-if="!token"
        to="/login"
        class="cursor-pointer py-1.5 px-2.5 bg-primary-light rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <Icon name="line-md:account" size="28" />
      </NuxtLink>

      <!-- logout -->
      <div
        v-else
        class="cursor-pointer py-1.5 px-2.5 bg-primary-light rounded-full shadow-md hover:shadow-lg transition-shadow"
        @click="handleLogout"
      >
        <Icon name="line-md:logout" size="28" style="color: red" />
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/api/useAuth';
import { useAntrian } from '@/composables/api/useAntrian';

const { getCookie } = useCookieManager();
const { logOut } = useAuth();
const { getCurrentAntrian, nextAntrian } = useAntrian();
const { data } = await useAsyncData('currentAntrian', () =>
  getCurrentAntrian().then((res) => res.data.value)
);

const token = getCookie('token');
const confirm = useConfirm();
const toast = useToast();
const router = useRouter();
const antrian = ref<string>('');

if (data.value?.status) {
  antrian.value = data.value?.data?.nomor || '';
} else {
  antrian.value = 'Belum Ada Antrian';
}

const handleNextAntrian = async () => {
  const response = await nextAntrian();
  if (response.data.value?.status) {
    antrian.value = response.data.value?.data?.nomor || '';
  }
};

const handleLogout = async () => {
  confirm.require({
    message: 'Apakah Anda yakin ingin keluar?',
    header: 'Konfirmasi Logout',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Batal',
    rejectProps: {
      label: 'Batal',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Ya, Logout',
      severity: 'danger',
    },
    accept: () => {
      logOut();
      toast.add({
        severity: 'success',
        summary: 'Berhasil',
        detail: 'Anda telah logout.',
        life: 3000,
      });
      router.push({ path: '/login' });
    },
  });
};
</script>
