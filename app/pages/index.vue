<template>
  <div class="flex items-center justify-center h-[calc(100vh-6rem)] px-6">
    <div
      class="grid gap-6 w-full"
      :class="{
        'grid-cols-1 max-w-xs': dataMenu.length === 1,
        'grid-cols-2 max-w-md': dataMenu.length === 2,
        'md:grid-cols-3 lg:grid-cols-4 max-w-6xl': dataMenu.length > 2,
      }"
      style="place-items: center"
    >
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
