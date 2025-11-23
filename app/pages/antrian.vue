<template>
  <div class="flex flex-col items-start w-full gap-4">
    <h1 class="text-3xl font-bold">Antrian Online</h1>

    <div
      class="flex flex-col bg-primary-light rounded-xl shadow py-6 w-full items-center gap-8 px-40"
    >
      <h1 class="font-bold text-xl">Formulir Antrian</h1>

      <div class="flex flex-col items-center w-full gap-3">
        <div class="flex flex-col items-start w-full gap-2">
          <label for="name" class="font-semibold text-sm">Nama Lengkap</label>
          <InputText id="name" type="text" fluid size="small" placeholder="Masukan nama lengkap" />
        </div>
        <div class="flex flex-col items-start w-full gap-2">
          <label for="nik" class="font-semibold text-sm">NIK</label>
          <InputText id="nik" type="number" fluid size="small" placeholder="Masukan NIK" />
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
          />
        </div>
        <div class="flex flex-col items-start w-full gap-2">
          <label for="keluhan" class="font-semibold text-sm">Keluhan Singkat</label>
          <Textarea id="keluhan" fluid />
        </div>
      </div>

      <BaseButton
        rounded="full"
        color="primary-blue"
        label="Ambil Antrian"
        size="sm"
        class="w-full"
        @click="handleClickAntrian"
      />
    </div>
  </div>

  <PopupAntrian :visible="visible" @update:visible="visible = $event" />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'custom',
});

const visible = ref(false);

const jenisKelaminOptions = ref([
  { label: 'Laki-laki', value: 'L' },
  { label: 'Perempuan', value: 'P' },
]);

const handleClickAntrian = () => {
  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, 3000);
};
</script>
