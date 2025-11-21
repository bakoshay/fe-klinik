<template>
  <div class="flex items-center justify-center px-6">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      <CardMenu
        v-for="(menu, index) in dataMenu"
        :key="index"
        :title="menu.title"
        :icon="menu.icon"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const dataMenu = [
  {
    title: 'Antrian Online',
    icon: 'mdi:account-group',
  },
  {
    title: 'Jadwal Dokter',
    icon: 'mdi:calendar-clock',
  },
  {
    title: 'Manajemen Dokter',
    icon: 'mdi:doctor',
  },
  {
    title: 'Pengelolaan Obat',
    icon: 'mdi:pill',
  },
  {
    title: 'Pembayaran',
    icon: 'mdi:cash-multiple',
  },
];
</script>
