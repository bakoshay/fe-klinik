<template>
  <div class="flex flex-col items-start w-full gap-2 md:gap-4">
    <h1 class="text-xl md:text-2xl lg:text-3xl font-bold">Antrian Online</h1>

    <form
      class="flex flex-col bg-primary-light rounded-xl shadow py-6 w-full items-center gap-4 md:gap-8 px-4 md:px-12 lg:px-28 xl:px-40"
      @submit.prevent="handleSubmit"
    >
      <h1 class="font-bold md:text-lg lg:text-xl">Formulir Antrian</h1>

      <div class="flex flex-col items-center w-full gap-3">
        <div class="flex flex-col items-start w-full gap-1 md:gap-2">
          <label for="name" class="font-semibold text-xs md:text-sm"
            >Nama Lengkap<span class="text-red-500">*</span></label
          >
          <InputText
            id="name"
            type="text"
            fluid
            size="small"
            placeholder="Masukan nama lengkap"
            v-model="form.nama"
            :class="{ 'p-invalid': validation.hasError('nama') }"
            @blur="validation.touch('nama')"
            @input="validation.validate('nama', form.nama)"
          />
          <small v-if="validation.getError('nama')" class="text-red-500">
            {{ validation.getError('nama') }}
          </small>
        </div>
        <div class="flex flex-col items-start w-full gap-1 md:gap-2">
          <label for="nik" class="font-semibold text-xs md:text-sm"
            >NIK<span class="text-red-500">*</span></label
          >
          <InputText
            id="nik"
            type="text"
            fluid
            size="small"
            placeholder="Masukan NIK"
            v-model="form.nik"
            :class="{ 'p-invalid': validation.hasError('nik') }"
            @blur="validation.touch('nik')"
            @input="validation.validate('nik', form.nik)"
          />
          <small v-if="validation.getError('nik')" class="text-red-500">
            {{ validation.getError('nik') }}
          </small>
        </div>
        <div class="flex flex-col items-start w-full gap-1 md:gap-2">
          <label for="jeniskelamin" class="font-semibold text-xs md:text-sm"
            >Jenis Kelamin<span class="text-red-500">*</span></label
          >
          <Select
            id="jeniskelamin"
            fluid
            size="small"
            placeholder="Pilih jenis kelamin"
            :options="jenisKelaminOptions"
            option-label="label"
            option-value="value"
            v-model="form.jenis_kelamin"
            :class="{ 'p-invalid': validation.hasError('jenis_kelamin') }"
            @blur="validation.touch('jenis_kelamin')"
            @change="validation.validate('jenis_kelamin', form.jenis_kelamin)"
          />
          <small v-if="validation.getError('jenis_kelamin')" class="text-red-500">
            {{ validation.getError('jenis_kelamin') }}
          </small>
        </div>
        <div class="flex flex-col items-start w-full gap-1 md:gap-2">
          <label for="keluhan" class="font-semibold text-xs md:text-sm"
            >Keluhan Singkat<span class="text-red-500">*</span></label
          >
          <Textarea
            id="keluhan"
            fluid
            v-model="form.keluhan"
            :class="{ 'p-invalid': validation.hasError('keluhan') }"
            @blur="validation.touch('keluhan')"
            @input="validation.validate('keluhan', form.keluhan)"
          />
          <small v-if="validation.getError('keluhan')" class="text-red-500">
            {{ validation.getError('keluhan') }}
          </small>
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
import { antrianValidation } from '@/validations';

definePageMeta({
  layout: 'custom',
});

const visible = ref(false);
const jenisKelaminOptions = useHelper().jenisKelamin;
const antrian = ref<string>('');
const loading = ref(false);
const toast = useToast();
const validation = useValidation(antrianValidation);
const { createAntrian } = useAntrian();
const { printBluetoothAntrian } = usePrint();

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
  validation.reset();
};

const handleSubmit = async () => {
  if (!validation.validateAll(form.value)) return;

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

    printBluetoothAntrian({
      nomor: antrian.value,
      pasien: form.value.nama,
    });

    visible.value = true;
    resetForm();

    // setelah beberapa saat, tutup popup antrian
    setTimeout(() => {
      visible.value = false;
    }, 5000);
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
