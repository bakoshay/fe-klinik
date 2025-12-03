<template>
  <div class="flex items-center justify-center md:h-[calc(100vh-6rem)] px-6">
    <div
      class="grid gap-6 w-full pb-4 md:pb-0 max-w-6xl"
      :class="[
        dataMenu.length === 1
          ? 'grid-cols-1 place-items-center'
          : dataMenu.length === 2
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
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
