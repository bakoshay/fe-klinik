<template>
  <Dialog
    :visible="visible"
    @update:visible="updateVisible"
    position="center"
    :closable="false"
    :modal="true"
    :pt="{
      header: { class: '!p-0' },
      content: { class: '!p-0' },
    }"
  >
    <template #header>
      <!-- Header -->
      <div class="py-4 px-8 w-full items-center justify-center">
        <p class="text-xl font-bold text-center">Nomor Antrian Anda</p>
      </div>
    </template>

    <!-- content -->
    <div class="py-4 px-8 w-full items-center justify-center flex flex-col gap-8">
      <h1 class="text-6xl font-extrabold">{{ antrian }}</h1>
      <p class="text-center text-primary-dark">
        Silahkan tunggu, Anda akan dipanggil oleh petugas saat giliran Anda tiba.
      </p>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: Boolean,
  antrian: {
    type: String,
    default: '',
  },
});

const emit = defineEmits<{
  'update:visible': [value: boolean];
}>();

const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};
</script>
