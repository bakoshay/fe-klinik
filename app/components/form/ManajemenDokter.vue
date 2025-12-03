<template>
  <Dialog
    :visible="visible"
    @update:visible="updateVisible"
    position="center"
    :modal="true"
    :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
    :style="{ width: '40rem' }"
    :pt="{
      header: { class: '!p-0' },
      content: { class: '!p-0 max-h-[70vh] overflow-y-auto' },
      footer: { class: '!p-0' },
    }"
  >
    <template #header>
      <!-- Header -->
      <div class="py-4 px-4 md:px-6 w-full items-start">
        <p class="text-base md:text-lg font-bold">
          {{ data ? 'Edit Data Dokter' : 'Tambah Data Dokter' }}
        </p>
      </div>
    </template>

    <!-- content -->
    <div class="px-4 md:px-6 w-full items-start flex flex-col gap-4 pb-4">
      <div class="flex flex-col items-start w-full gap-1">
        <label for="name" class="font-semibold text-sm"
          >Nama Dokter<span class="text-red-500">*</span></label
        >
        <InputText
          id="name"
          v-model="form.name"
          type="text"
          fluid
          size="small"
          placeholder="Masukan nama dokter"
          :class="{ 'p-invalid': validation.hasError('name') }"
          @blur="validation.touch('name')"
          @input="validation.validate('name', form.name)"
        />
        <small v-if="validation.getError('name')" class="text-red-500">
          {{ validation.getError('name') }}
        </small>
      </div>

      <div class="flex flex-col items-start w-full gap-2">
        <label for="jeniskelamin" class="font-semibold text-sm"
          >Jenis Kelamin<span class="text-red-500">*</span></label
        >
        <Select
          id="jeniskelamin"
          v-model="form.gender"
          fluid
          size="small"
          placeholder="Pilih jenis kelamin"
          :options="jenisKelaminOptions"
          option-label="label"
          option-value="value"
          :class="{ 'p-invalid': validation.hasError('gender') }"
          @blur="validation.touch('gender')"
          @change="validation.validate('gender', form.gender)"
        />
        <small v-if="validation.getError('gender')" class="text-red-500">
          {{ validation.getError('gender') }}
        </small>
      </div>

      <div class="flex flex-col items-start w-full gap-2">
        <label for="alamat" class="font-semibold text-sm"
          >Alamat<span class="text-red-500">*</span></label
        >
        <Textarea
          id="alamat"
          v-model="form.address"
          fluid
          placeholder="Masukan alamat"
          :class="{ 'p-invalid': validation.hasError('address') }"
          @blur="validation.touch('address')"
          @input="validation.validate('address', form.address)"
        />
        <small v-if="validation.getError('address')" class="text-red-500">
          {{ validation.getError('address') }}
        </small>
      </div>

      <div class="flex flex-col items-start w-full gap-2">
        <label for="nohp" class="font-semibold text-sm"
          >No HP<span class="text-red-500">*</span></label
        >
        <InputText
          id="nohp"
          v-model="form.phone"
          type="tel"
          fluid
          size="small"
          placeholder="Masukan No HP"
          :class="{ 'p-invalid': validation.hasError('phone') }"
          @blur="validation.touch('phone')"
          @input="validation.validate('phone', form.phone)"
        />
        <small v-if="validation.getError('phone')" class="text-red-500">
          {{ validation.getError('phone') }}
        </small>
      </div>

      <div class="flex flex-col items-start w-full gap-2">
        <p class="font-semibold text-sm">Jadwal Praktek<span class="text-red-500">*</span></p>
        <div class="grid gap-3 w-full">
          <div
            v-for="(item, i) in schedule"
            :key="i"
            class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
          >
            <!-- Checkbox + Day -->
            <div class="flex items-center gap-3 sm:w-32">
              <Checkbox v-model="item.selected" :binary="true" />
              <span class="capitalize text-sm font-medium">{{ item.day }}</span>
            </div>

            <!-- Time Inputs -->
            <div class="flex items-center gap-2 flex-1 ml-7 sm:ml-0">
              <InputText
                type="time"
                v-model="item.start"
                :disabled="!item.selected"
                class="flex-1 text-sm"
                size="small"
              />
              <span class="text-gray-400 text-xs">-</span>
              <InputText
                type="time"
                v-model="item.end"
                :disabled="!item.selected"
                class="flex-1 text-sm"
                size="small"
              />
            </div>
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
      <div class="w-full flex justify-end gap-2 px-4 md:px-6 py-4">
        <BaseButton color="secondary" label="Batal" size="sm" @click="updateVisible(false)" />
        <BaseButton
          color="primary-blue"
          :label="data ? 'Ubah' : 'Simpan'"
          size="sm"
          @click="handleSubmit"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import useHelper from '~/utils/helper';
import { useDokter } from '@/composables/api/useDokter';
import { dokterValidation } from '@/validations';
import type { Dokter } from '~/types/dokter';

const props = defineProps({
  visible: Boolean,
  data: {
    type: Object as () => Dokter | null,
    default: null,
  },
});

const jenisKelaminOptions = useHelper().jenisKelamin;
const schedule = useHelper().schedule;
const toast = useToast();
const validation = useValidation(dokterValidation);
const { createDokter, updateDokter } = useDokter();

const statusOptions = ref([
  { label: 'Hadir', value: true },
  { label: 'Tidak Hadir', value: false },
]);

const emit = defineEmits<{
  'update:visible': [value: boolean];
  saved: [];
}>();

const updateVisible = (value: boolean) => {
  emit('update:visible', value);
  if (!value) {
    resetForm();
  }
};

const form = ref({
  name: '',
  gender: '' as 'L' | 'P' | '',
  phone: '',
  address: '',
  schedules: [] as Array<{ day: string; start: string; end: string }>,
  is_active: true,
});

const resetForm = () => {
  form.value = {
    name: '',
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
  validation.reset();
};

const handleSubmit = async () => {
  form.value.schedules = schedule.value
    .filter((s) => s.selected && s.start && s.end)
    .map((s) => ({
      day: s.day,
      start: s.start as string,
      end: s.end as string,
    }));

  if (
    !validation.validateAll(form.value) ||
    !form.value.schedules ||
    form.value.schedules.length === 0
  ) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Pastikan semua data terisi dan pilih setidaknya satu jadwal praktek dokter',
      life: 3000,
    });
    return;
  }

  try {
    const payload = {
      name: form.value.name,
      specialty: 'Umum',
      gender: form.value.gender,
      phone: form.value.phone,
      address: form.value.address,
      is_active: form.value.is_active,
      schedules: schedule.value
        .filter((s) => s.selected && s.start && s.end)
        .map((s) => ({
          day: s.day,
          start: s.start as string,
          end: s.end as string,
        })),
    };

    if (props.data) {
      // update
      const response = await updateDokter(props.data.id, payload);

      toast.add({
        severity: 'success',
        summary: 'Sukses',
        detail: response.data.value?.message,
        life: 3000,
      });
    } else {
      // create
      const response = await createDokter(payload);

      toast.add({
        severity: 'success',
        summary: 'Sukses',
        detail: response.data.value?.message,
        life: 3000,
      });
    }

    emit('saved');
    updateVisible(false);
  } catch (error) {
    console.error('Error:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
      life: 3000,
    });

    updateVisible(false);
  }
};

// Watch untuk detect perubahan data (saat edit)
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      form.value = {
        name: newData.nama,
        gender: newData.jenis_kelamin,
        phone: newData.handphone,
        address: newData.alamat,
        schedules: newData.jadwal_dokter
          .filter((s) => typeof s.jam_mulai === 'string' && typeof s.jam_selesai === 'string')
          .map((s) => ({
            day: s.hari,
            start: s.jam_mulai as string,
            end: s.jam_selesai as string,
          })),
        is_active: newData.status,
      };

      // Mapping schedules ke UI checkbox
      schedule.value = schedule.value.map((d) => {
        const found = newData.jadwal_dokter.find((s) => s.hari === d.day);
        return found
          ? {
              day: d.day,
              selected: true,
              start: found.jam_mulai,
              end: found.jam_selesai,
            }
          : { ...d, selected: false, start: null, end: null };
      });
    } else resetForm();
  },
  { immediate: true }
);
</script>
