<template>
  <NuxtLink
    :to="path"
    class="flex flex-col items-center justify-center bg-primary-light p-6 gap-6 rounded-xl shadow-lg cursor-pointer w-full h-full"
  >
    <Icon :name="icon" size="75" />
    <h1 class="font-bold text-2xl text-center">{{ title }}</h1>
  </NuxtLink>
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
  path: {
    type: String,
    default: '/',
  },
});
</script>
