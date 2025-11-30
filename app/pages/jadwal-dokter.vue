<template>
  <div
    class="flex flex-col bg-primary-light rounded-xl shadow py-4 px-4 lg:py-6 lg:px-6 w-full items-center gap-6"
  >
    <!-- Desktop: Tampilan Badge Seperti Sebelumnya -->
    <div class="hidden lg:flex w-full gap-4 items-start flex-wrap">
      <span
        v-for="(day, index) in days"
        :key="index"
        @click="onDayChange(day.value)"
        :class="
          daySelected === day.value
            ? 'text-primary-light bg-primary-dark'
            : 'bg-primary-gray hover:bg-primary-dark hover:text-primary-light cursor-pointer'
        "
        class="px-4 py-1.5 rounded-xl font-medium"
        >{{ day.label }}</span
      >
    </div>

    <!-- Mobile & Tablet: Dropdown Select -->
    <div class="lg:hidden w-full">
      <Dropdown
        v-model="daySelected"
        :options="days"
        optionLabel="label"
        size="small"
        optionValue="value"
        @change="onDayChange(daySelected)"
        placeholder="Pilih Hari"
        class="w-full"
      />
    </div>

    <h2 v-if="!data?.data.length" class="font-bold text-primary-dark lg:text-xl text-center">
      {{ `Tidak Ada Jadwal Dokter Pada Hari ${useHelper().capitalizeFirst(daySelected)}` }}
    </h2>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <CardJadwalDokter
        v-for="(docter, index) in data?.data"
        :key="index"
        :name="docter.nama"
        :specialty="docter.spesialis"
        :schedule="docter.jadwal_dokter.map((j) => `${j.jam_mulai} - ${j.jam_selesai}`).join(', ')"
        :status="docter.status"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useHelper from '~/utils/helper';
import { useDokter } from '@/composables/api/useDokter';

definePageMeta({
  layout: 'custom',
});

const daySelected = ref('senin');
const days = useHelper().days;

const { getByDay } = useDokter();
const { data } = await useAsyncData('dokter-by-day', () =>
  getByDay(daySelected.value).then((res) => res.data.value)
);

const onDayChange = (value: string) => {
  daySelected.value = value;

  getByDay(daySelected.value).then((res) => {
    data.value = res.data.value;
  });
};
</script>
