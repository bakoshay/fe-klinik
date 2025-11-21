<template>
  <div class="flex items-center justify-center h-[calc(100vh-6rem)] px-6">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
      <CardMenu
        v-for="(menu, index) in dataMenu"
        :key="index"
        :title="menu.title"
        :icon="menu.icon"
        :path="menu.path"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'simple',
});

const { dataMenu } = useMenu();
</script>
