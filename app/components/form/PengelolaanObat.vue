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
        <p class="text-lg font-bold">{{ data ? 'Edit Data Obat' : 'Tambah Data Obat' }}</p>
      </div>
    </template>

    <!-- content -->
    <div class="px-6 w-full items-start flex flex-col gap-4">
      <div class="flex flex-col items-start w-full gap-1">
        <label for="name" class="font-semibold text-sm"
          >Nama Obat<span class="text-red-500">*</span></label
        >
        <InputText
          id="name"
          v-model="form.nama"
          type="text"
          fluid
          size="small"
          placeholder="Masukan nama dokter"
          :class="{ 'p-invalid': validation.hasError('nama') }"
          @blur="validation.touch('nama')"
          @input="validation.validate('nama', form.nama)"
        />
        <small v-if="validation.getError('nama')" class="text-red-500">
          {{ validation.getError('nama') }}
        </small>
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <label for="jenisObat" class="font-semibold text-sm"
          >Jenis Obat<span class="text-red-500">*</span></label
        >
        <Select
          id="jenisObat"
          v-model="form.jenis"
          fluid
          size="small"
          placeholder="Pilih jenis obat"
          :options="jenisObatOptions"
          option-label="label"
          option-value="value"
          :class="{ 'p-invalid': validation.hasError('jenis') }"
          @blur="validation.touch('jenis')"
          @change="validation.validate('jenis', form.jenis)"
        />
        <small v-if="validation.getError('jenis')" class="text-red-500">
          {{ validation.getError('jenis') }}
        </small>
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <label for="harga" class="font-semibold text-sm"
          >Harga<span class="text-red-500">*</span></label
        >
        <InputNumber
          id="harga"
          v-model="form.harga"
          mode="currency"
          currency="IDR"
          locale="id-ID"
          fluid
          size="small"
          placeholder="Masukan harga"
          :class="{ 'p-invalid': validation.hasError('harga') }"
          @blur="validation.touch('harga')"
          @input="validation.validate('harga', form.harga)"
        />
        <small v-if="validation.getError('harga')" class="text-red-500">
          {{ validation.getError('harga') }}
        </small>
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <label for="status" class="font-semibold text-sm">Status Stock</label>
        <Select
          id="status"
          v-model="form.status"
          fluid
          size="small"
          placeholder="Pilih status stock"
          :options="stockOptions"
          option-label="label"
          option-value="value"
        />
      </div>
    </div>

    <template #footer>
      <!-- Footer -->
      <div class="w-full flex justify-end gap-2 px-6 py-4">
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
import { useObat } from '@/composables/api/useObat';
import { obatValidation } from '@/validations';
import type { DataObat } from '~/types/obat';

const props = defineProps({
  visible: Boolean,
  data: {
    type: Object as () => DataObat | null,
    default: null,
  },
});

const toast = useToast();
const validation = useValidation(obatValidation);
const { createObat, updateObat } = useObat();

const jenisObatOptions = ref([
  { label: 'Tablet', value: 'tablet' },
  { label: 'Kapsul', value: 'kapsul' },
  { label: 'Kaplet', value: 'kaplet' },
]);

const stockOptions = ref([
  { label: 'Tersedia', value: true },
  { label: 'Tidak Tersedia', value: false },
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
  nama: '',
  jenis: '' as 'tablet' | 'kapsul' | 'kaplet' | '',
  harga: 0,
  status: true,
});

const resetForm = () => {
  form.value = {
    nama: '',
    jenis: '' as 'tablet' | 'kapsul' | 'kaplet' | '',
    harga: 0,
    status: true,
  };
  validation.reset();
};

const handleSubmit = async () => {
  if (!validation.validateAll(form.value)) return;

  try {
    const payload = {
      nama: form.value.nama,
      jenis: form.value.jenis,
      harga: form.value.harga,
      status: form.value.status,
    };

    if (props.data) {
      // update
      const response = await updateObat(props.data.id, payload);
      toast.add({
        severity: 'success',
        summary: 'Sukses',
        detail: response.data.value?.message,
        life: 3000,
      });
    } else {
      // create
      const response = await createObat(payload);

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
        nama: newData.nama,
        jenis: newData.jenis,
        harga: newData.harga,
        status: newData.status,
      };
    } else resetForm();
  },
  { immediate: true }
);
</script>
