<template>
  <header
    class="fixed top-0 left-0 right-0 w-full bg-primary md:px-6 px-4 md:py-4 py-2 shadow-md z-50"
  >
    <nav class="flex justify-between items-center w-full">
      <!-- logo -->
      <div class="flex items-center gap-2">
        <img src="/images/logo.png" alt="Logo" class="md:size-8 lg:size-9 size-6" />
        <h1 class="text-primary-dark font-extrabold md:text-base lg:text-lg text-xs">
          KLINIK VIRJA MEDIKA
        </h1>
      </div>

      <!-- antrian -->
      <div v-if="token" class="flex items-center md:gap-1">
        <div
          class="flex md:py-1.5 md:px-3 lg:px-4 lg:py-2 py-2 px-2 items-center bg-primary-light rounded-lg shadow-lg"
        >
          <p class="font-bold text-xs md:text-base">{{ antrian ?? '' }}</p>
        </div>

        <button
          v-if="data?.data"
          @click="handleNextAntrian"
          class="flex items-center rounded-lg cursor-pointer hover:shadow-md transition-shadow"
        >
          <ChevronRightIcon class="size-5 md:size-6 lg:size-7" />
        </button>
      </div>

      <!-- login -->
      <NuxtLink
        v-if="!token"
        to="/login"
        class="cursor-pointer py-1.5 px-1.5 md:py-2 md:px-2.5 bg-primary-light rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <ProfileIcon class="size-5 md:size-6 lg:size-7" />
      </NuxtLink>

      <!-- logout -->
      <div
        v-else
        class="cursor-pointer py-1.5 px-1.5 md:py-2 md:px-2.5 bg-primary-light rounded-full shadow-md hover:shadow-lg transition-shadow"
        @click="handleLogout"
      >
        <LogoutIcon class="size-5 md:size-6 lg:size-7" />
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.vue';
import ProfileIcon from '@/assets/icons/ProfileIcon.vue';
import LogoutIcon from '@/assets/icons/LogoutIcon.vue';
import { useAuth } from '@/composables/api/useAuth';
import { useAntrian } from '@/composables/api/useAntrian';

const { getCookie } = useCookieManager();
const { logOut } = useAuth();
const { getCurrentAntrian, nextAntrian } = useAntrian();
const { data } = await useAsyncData('currentAntrian', () =>
  getCurrentAntrian().then((res) => res.data.value),
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
  if (response.data.value?.status && response.data.value?.data) {
    antrian.value = response.data.value.data.nomor || '';
  } else {
    antrian.value = 'Belum Ada Antrian';
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
