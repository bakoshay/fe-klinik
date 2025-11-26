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
        <label for="name" class="font-semibold text-sm">Nama Obat</label>
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
        <label for="jenisObat" class="font-semibold text-sm">Jenis Obat</label>
        <Select
          id="jenisObat"
          v-model="form.type_of_drug"
          fluid
          size="small"
          placeholder="Pilih jenis obat"
          :options="jenisObatOptions"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <label for="harga" class="font-semibold text-sm">Harga</label>
        <InputNumber
          id="harga"
          v-model="form.price"
          mode="currency"
          currency="IDR"
          locale="id-ID"
          fluid
          size="small"
          placeholder="Masukan harga"
        />
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <label for="status" class="font-semibold text-sm">Status Stock</label>
        <Select
          id="status"
          v-model="form.is_active"
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
        <BaseButton color="primary-blue" :label="data ? 'Ubah' : 'Simpan'" size="sm" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import useHelper from '~/utils/helper';
import type { Obat } from '~/types/obat';

const props = defineProps({
  visible: Boolean,
  data: {
    type: Object as () => Obat | null,
    default: null,
  },
});

const schedule = useHelper().schedule;

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
}>();

const updateVisible = (value: boolean) => {
  emit('update:visible', value);
  if (!value) {
    resetForm();
  }
};

const form = ref({
  name: '',
  type_of_drug: '' as 'tablet' | 'kapsul' | 'kaplet' | '',
  price: 0,
  is_active: true,
});

const resetForm = () => {
  form.value = {
    name: '',
    type_of_drug: '' as 'tablet' | 'kapsul' | 'kaplet' | '',
    price: 0,
    is_active: true,
  };
};

// Watch untuk detect perubahan data (saat edit)
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      form.value = {
        name: newData.name,
        type_of_drug: newData.type_of_drug,
        price: newData.price,
        is_active: newData.is_active,
      };
    } else resetForm();
  },
  { immediate: true }
);
</script>
