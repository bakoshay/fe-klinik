<template>
  <aside class="fixed left-0 top-20 bottom-0 w-64 bg-primary-dark">
    <nav class="h-full flex flex-col justify-center gap-4 p-4 w-full">
      <NuxtLink
        v-for="(menu, index) in dataMenu"
        :key="index"
        :to="menu.path"
        class="flex items-center justify-center gap-2 p-2 rounded-full transition-colors"
        :class="
          route.path === menu.path
            ? 'bg-primary-blue text-primary-light'
            : 'bg-primary-light text-primary-dark hover:bg-primary-blue hover:text-primary-light'
        "
      >
        <Icon :name="menu.icon" size="20" />
        <p class="font-semibold">{{ menu.title }}</p>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
const route = useRoute();
const { dataMenu } = useMenu();
</script>
