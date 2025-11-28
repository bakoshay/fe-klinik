<template>
  <div class="flex flex-col items-start w-full gap-4">
    <h1 class="text-3xl font-bold">Antrian Online</h1>

    <form
      class="flex flex-col bg-primary-light rounded-xl shadow py-6 w-full items-center gap-8 px-40"
      @submit.prevent="handleSubmit"
    >
      <h1 class="font-bold text-xl">Formulir Antrian</h1>

      <div class="flex flex-col items-center w-full gap-3">
        <div class="flex flex-col items-start w-full gap-2">
          <label for="name" class="font-semibold text-sm">Nama Lengkap</label>
          <InputText
            id="name"
            type="text"
            fluid
            size="small"
            placeholder="Masukan nama lengkap"
            v-model="form.nama"
          />
        </div>
        <div class="flex flex-col items-start w-full gap-2">
          <label for="nik" class="font-semibold text-sm">NIK</label>
          <InputText
            id="nik"
            type="text"
            fluid
            size="small"
            placeholder="Masukan NIK"
            v-model="form.nik"
          />
        </div>
        <div class="flex flex-col items-start w-full gap-2">
          <label for="jeniskelamin" class="font-semibold text-sm">Jenis Kelamin</label>
          <Select
            id="jeniskelamin"
            fluid
            size="small"
            placeholder="Pilih jenis kelamin"
            :options="jenisKelaminOptions"
            option-label="label"
            option-value="value"
            v-model="form.jenis_kelamin"
          />
        </div>
        <div class="flex flex-col items-start w-full gap-2">
          <label for="keluhan" class="font-semibold text-sm">Keluhan Singkat</label>
          <Textarea id="keluhan" fluid v-model="form.keluhan" />
        </div>
      </div>

      <BaseButton
        rounded="full"
        color="primary-blue"
        size="sm"
        class="w-full"
        :disabled="loading"
        type="submit"
      >
        <template #default>
          <span v-if="loading" class="flex items-center gap-2">
            <Icon class="animate-spin h-5 w-5 inline" name="lucide:loader" />
            Loading...
          </span>
          <span v-else>Ambil Antrian</span>
        </template>
      </BaseButton>
    </form>
  </div>

  <PopupAntrian :visible="visible" @update:visible="visible = $event" :antrian="antrian" />
</template>

<script lang="ts" setup>
import useHelper from '~/utils/helper';
import { useAntrian } from '@/composables/api/useAntrian';

definePageMeta({
  layout: 'custom',
});

const visible = ref(false);
const jenisKelaminOptions = useHelper().jenisKelamin;
const antrian = ref<string>('');
const loading = ref(false);
const toast = useToast();
const { createAntrian } = useAntrian();

const form = ref({
  nama: '',
  nik: '',
  jenis_kelamin: '',
  keluhan: '',
});

const resetForm = () => {
  form.value = {
    nama: '',
    nik: '',
    jenis_kelamin: '',
    keluhan: '',
  };
};

const handleSubmit = async () => {
  loading.value = true;

  try {
    const payload = {
      nama: form.value.nama,
      nik: form.value.nik,
      jenis_kelamin: form.value.jenis_kelamin,
      keluhan: form.value.keluhan,
    };

    const response = await createAntrian(payload);
    antrian.value = response.data.value?.data.nomor || '';

    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 5000);
    resetForm();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>
