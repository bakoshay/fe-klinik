<template>
  <Dialog
    :visible="visible"
    @update:visible="updateVisible"
    position="center"
    :modal="true"
    :style="{ width: '40rem' }"
    :pt="{
      header: { class: '!p-0' },
      content: { class: '!p-0' },
      footer: { class: '!p-0' },
    }"
  >
    <template #header>
      <!-- Header -->
      <div class="py-4 px-6 w-full items-start">
        <p class="text-lg font-bold">{{ data ? 'Edit Data Dokter' : 'Tambah Data Dokter' }}</p>
      </div>
    </template>

    <!-- content -->
    <div class="px-6 w-full items-start flex flex-col gap-4">
      <div class="flex flex-col items-start w-full gap-1">
        <label for="name" class="font-semibold text-sm">Nama Dokter</label>
        <InputText
          id="name"
          v-model="form.name"
          type="text"
          fluid
          size="small"
          placeholder="Masukan nama dokter"
        />
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <label for="jeniskelamin" class="font-semibold text-sm">Jenis Kelamin</label>
        <Select
          id="jeniskelamin"
          v-model="form.gender"
          fluid
          size="small"
          placeholder="Pilih jenis kelamin"
          :options="jenisKelaminOptions"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <label for="alamat" class="font-semibold text-sm">Alamat</label>
        <Textarea id="alamat" v-model="form.address" fluid placeholder="Masukan alamat" />
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <label for="nohp" class="font-semibold text-sm">No HP</label>
        <InputText
          id="nohp"
          v-model="form.phone"
          type="tel"
          fluid
          size="small"
          placeholder="Masukan No HP"
        />
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <p class="font-semibold text-sm">Jadwal Praktek</p>
        <div class="grid gap-4 w-full">
          <div v-for="(item, i) in schedule" :key="i" class="flex items-center gap-4">
            <Checkbox v-model="item.selected" :binary="true" />

            <span class="w-24 capitalize">{{ item.day }}</span>

            <InputText type="time" v-model="item.start" :disabled="!item.selected" />
            <InputText type="time" v-model="item.end" :disabled="!item.selected" />
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <label for="status" class="font-semibold text-sm">Status</label>
        <Select
          id="status"
          v-model="form.is_active"
          fluid
          size="small"
          placeholder="Pilih status"
          :options="statusOptions"
          option-label="label"
          option-value="value"
        />
      </div>
    </div>

    <template #footer>
      <!-- Footer -->
      <div class="w-full flex justify-end gap-2 px-6 py-4">
        <BaseButton color="secondary" label="Batal" size="sm" @click="updateVisible(false)" />
        <BaseButton color="primary-blue" :label="data ? 'Ubah' : 'Simpan'" size="sm" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import useHelper from '~/utils/helper';
import type { Dokter } from '~/types/dokter';

const props = defineProps({
  visible: Boolean,
  data: {
    type: Object as () => Dokter | null,
    default: null,
  },
});

const jenisKelaminOptions = useHelper().jenisKelamin;
const statusOptions = useHelper().status;

const schedule = useHelper().schedule;
const emit = defineEmits<{
  'update:visible': [value: boolean];
}>();

const updateVisible = (value: boolean) => {
  emit('update:visible', value);
  if (!value) {
    resetForm();
  }
};

const form = ref({
  name: '',
  specialty: '',
  gender: '' as 'L' | 'P' | '',
  phone: '',
  address: '',
  schedules: [] as Array<{ day: string; start: string; end: string }>,
  is_active: true,
});

const resetForm = () => {
  form.value = {
    name: '',
    specialty: '',
    gender: '',
    phone: '',
    address: '',
    schedules: [],
    is_active: true,
  };

  schedule.value = schedule.value.map((x) => ({
    ...x,
    selected: false,
    start: null,
    end: null,
  }));
};

// Watch untuk detect perubahan data (saat edit)
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      form.value = {
        name: newData.name,
        specialty: newData.specialty,
        gender: newData.gender,
        phone: newData.phone,
        address: newData.address,
        schedules: newData.schedules
          .filter((s) => typeof s.start === 'string' && typeof s.end === 'string')
          .map((s) => ({
            day: s.day,
            start: s.start as string,
            end: s.end as string,
          })),
        is_active: newData.is_active,
      };

      // Mapping schedules ke UI checkbox
      schedule.value = schedule.value.map((d) => {
        const found = newData.schedules.find((s) => s.day === d.day);
        return found
          ? {
              day: d.day,
              selected: true,
              start: found.start,
              end: found.end,
            }
          : { ...d, selected: false, start: null, end: null };
      });
    } else resetForm();
  },
  { immediate: true }
);
</script>
