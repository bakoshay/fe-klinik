<template>
  <div
    class="flex flex-col bg-primary-light rounded-xl shadow py-6 px-14 w-full items-center gap-10"
  >
    <div class="flex w-full gap-4 items-start">
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

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
      <CardJadwalDokter
        v-for="(docter, index) in docters"
        :key="index"
        :name="docter.name"
        :specialty="docter.specialty"
        :schedule="docter.schedule"
        :status="docter.status"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useHelper from '~/utils/helper';

definePageMeta({
  layout: 'custom',
});

const daySelected = ref('senin');
const days = useHelper().days;

const onDayChange = (value: string) => {
  daySelected.value = value;
};

const docters = ref([
  {
    name: 'Dr. Aulia Pratama',
    specialty: 'Umum',
    schedule: '08.00 - 12.00',
    status: true,
  },
  {
    name: 'Dr. Siti Aminah',
    specialty: 'Gigi',
    schedule: '10.00 - 14.00',
    status: false,
  },
  {
    name: 'Dr. Budi Santoso',
    specialty: 'Kandungan',
    schedule: '12.00 - 16.00',
    status: true,
  },
  {
    name: 'Dr. Rina Wijaya',
    specialty: 'Anak',
    schedule: '09.00 - 13.00',
    status: true,
  },
]);
</script>
