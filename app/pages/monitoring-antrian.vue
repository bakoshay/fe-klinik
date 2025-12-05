<template>
  <div class="min-h-screen flex items-center justify-center px-4" @click="enableBellAudio">
    <div class="bg-primary-light rounded-xl shadow-lg p-8 w-full flex flex-col items-center gap-6">
      <div class="flex flex-col items-center gap-2">
        <img src="/images/logo.png" alt="logo" class="md:size-16 size-14 lg:size-18 xl:size-28" />
        <h1 class="md:text-2xl xl:text-4xl text-xl font-bold text-primary-dark tracking-wide">
          Monitoring Antrian
        </h1>
      </div>
      <div class="w-full flex flex-col items-center gap-6">
        <!-- Nomor Antrian Saat Ini -->
        <div class="flex flex-col items-center gap-1">
          <span class="text-gray-500 text-sm lg:text-base xl:text-xl">Nomor Antrian Saat Ini</span>
          <span
            v-if="antrianData?.current?.nomor"
            class="md:text-5xl xl:text-8xl lg:text-6xl text-4xl font-extrabold text-primary-dark tracking-widest animate-pulse"
          >
            {{ antrianData?.current?.nomor }}
          </span>
          <span v-else class="md:text-2xl xl:text-3xl text-xl text-gray-400"
            >Tidak ada antrian saat ini</span
          >
        </div>
        <!-- Daftar Antrian Selanjutnya -->
        <div class="w-full flex flex-col items-start gap-2">
          <h2 class="md:text-lg lg:text-xl xl:text-3xl font-semibold text-primary-dark">
            Antrian Selanjutnya
          </h2>
          <div class="grid grid-cols-2 gap-4 w-full">
            <div
              v-for="(item, idx) in antrianData?.next"
              :key="idx"
              class="bg-primary-light rounded-lg shadow p-4 flex flex-col items-center"
            >
              <span class="md:text-xl lg:text-2xl xl:text-3xl font-bold text-primary-dark">{{
                item.nomor
              }}</span>
              <span class="text-[10px] lg:text-sm xl:text-lg text-gray-500">{{ item.pasien }}</span>
            </div>
            <div
              v-if="!antrianData?.next?.length"
              class="col-span-2 text-center text-gray-400 text-sm lg:text-base xl:text-2xl"
            >
              Tidak ada antrian berikutnya
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAntrianSocket } from '@/composables/ws/useAntrianSocket';
import { useAntrianBell } from '@/composables/useAntrianBell';

const { antrianData, connect, disconnect } = useAntrianSocket();
const { enableAudio } = useAntrianBell();

const enableBellAudio = () => {
  enableAudio();
};

onMounted(() => {
  connect();
});

onUnmounted(() => {
  disconnect();
});
</script>
