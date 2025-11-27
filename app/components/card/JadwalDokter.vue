<template>
  <div class="flex flex-col w-full p-4 items-start bg-primary-gray rounded-xl gap-4 shadow-lg">
    <div class="flex gap-4 w-full items-start border-b pb-4">
      <Icon name="weui:me-filled" size="35" />
      <div class="flex flex-col items-start w-full gap-1">
        <h1 class="font-bold">{{ name }}</h1>
        <p class="text-gray-500 text-sm">{{ specialty }}</p>
      </div>
    </div>

    <div class="flex items-center w-full gap-4">
      <Icon name="mdi:clock-time-four-outline" size="30" class="shrink-0" />
      <p class="font-medium">{{ schedule }}</p>
      <span
        :class="[
          'text-xs py-0.5 px-2 rounded-full text-center',
          status ? 'bg-green-500 text-primary-light' : 'bg-red-500 text-primary-light',
        ]"
        >{{ status ? 'Hadir' : 'Tidak Hadir' }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    default: 'Dr. Aulia Pratama',
  },
  specialty: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
</script>
