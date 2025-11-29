<template>
  <div class="flex items-center justify-center md:h-[calc(100vh-6rem)] px-6">
    <div
      class="grid gap-6 w-full pb-4 md:pb-0"
      :class="[
        dataMenu.length === 1
          ? 'grid-cols-1 max-w-xs place-items-center'
          : dataMenu.length === 2
          ? 'md:grid-cols-2 grid-cols-1 max-w-md place-items-center'
          : 'md:grid-cols-3 lg:grid-cols-4 max-w-6xl',
      ]"
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
