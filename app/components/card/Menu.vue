<template>
  <div
    class="flex flex-col items-center justify-center bg-primary-light p-6 gap-6 rounded-xl shadow-lg cursor-pointer"
  >
    <Icon :name="icon" size="75" />
    <h1 class="font-bold text-2xl text-center">{{ title }}</h1>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'Menu Card',
  },
  icon: {
    type: String,
    default: 'mdi:account-group',
  },
});
</script>
