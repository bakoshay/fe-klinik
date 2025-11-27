<template>
  <header class="fixed top-0 left-0 right-0 w-full bg-primary px-6 py-4 shadow-md z-50">
    <nav class="flex justify-between items-center w-full">
      <div class="flex items-center gap-2">
        <img src="/images/logo.png" alt="Logo" class="size-9" />
        <h1 class="text-primary-dark font-extrabold text-lg">KLINIK VIRZA MEDIKA</h1>
      </div>

      <NuxtLink
        v-if="!token"
        to="/login"
        class="cursor-pointer py-1.5 px-2.5 bg-primary-light rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <Icon name="line-md:account" size="28" />
      </NuxtLink>

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
const { getCookie, clearAllCookies } = useCookieManager();

const token = getCookie('token');
const confirm = useConfirm();
const toast = useToast();
const router = useRouter();

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
      clearAllCookies();
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
