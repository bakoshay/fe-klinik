<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div
      class="bg-primary-light rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col items-center gap-6"
    >
      <div class="flex flex-col items-center gap-2">
        <img src="/images/logo.png" alt="logo" class="size-16" />
        <h1 class="text-2xl font-bold text-primary-dark tracking-wide">Monitoring Antrian</h1>
      </div>
      <div class="w-full flex flex-col items-center gap-6">
        <!-- Nomor Antrian Saat Ini -->
        <div class="flex flex-col items-center gap-1">
          <span class="text-gray-500 text-sm">Nomor Antrian Saat Ini</span>
          <span class="text-6xl font-extrabold text-primary-dark tracking-widest animate-pulse">
            {{ antrianData?.current?.nomor }}
          </span>
        </div>
        <!-- Daftar Antrian Selanjutnya -->
        <div class="w-full flex flex-col items-start gap-2">
          <h2 class="text-lg font-semibold text-primary-dark">Antrian Selanjutnya</h2>
          <div class="grid grid-cols-2 gap-4 w-full">
            <div
              v-for="(item, idx) in antrianData?.next"
              :key="idx"
              class="bg-primary-light rounded-lg shadow p-4 flex flex-col items-center"
            >
              <span class="text-xl font-bold text-primary-dark">{{ item.nomor }}</span>
              <span class="text-xs text-gray-500">{{ item.pasien }}</span>
            </div>
            <div v-if="!antrianData?.next?.length" class="col-span-2 text-center text-gray-400">
              Tidak ada antrian berikutnya
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAntrianWebSocket } from '@/composables/api/useAntrianWebSocket';

const { antrianData, connect, disconnect } = useAntrianWebSocket();

onMounted(() => {
  connect();
});

onUnmounted(() => {
  disconnect();
});
</script>
