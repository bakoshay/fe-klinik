<template>
  <aside
    class="hidden md:block fixed left-0 top-[70px] lg:top-[75px] bottom-0 w-36 lg:w-64 bg-primary-dark"
  >
    <div class="h-full flex flex-col justify-center gap-4 p-4 w-full">
      <NuxtLink
        v-for="(menu, index) in dataMenu"
        :key="index"
        :to="menu.path"
        class="flex flex-col lg:flex-row items-center justify-center gap-2 p-2 rounded-full transition-colors"
        :class="
          route.path === menu.path
            ? 'bg-primary-blue text-primary-light'
            : 'bg-primary-light text-primary-dark hover:bg-primary-blue hover:text-primary-light'
        "
      >
        <Icon :name="menu.icon" size="20" />
        <p class="font-semibold text-center text-xs lg:text-base">{{ menu.title }}</p>
      </NuxtLink>
    </div>
  </aside>

  <nav
    class="fixed md:hidden bottom-0 left-0 right-0 z-50 bg-primary-dark flex justify-around items-center py-1 shadow-lg lg:hidden"
  >
    <NuxtLink
      v-for="(menu, index) in dataMenu"
      :key="index"
      :to="menu.path"
      class="flex flex-col items-center justify-center gap-1 px-2 py-1 rounded transition-colors"
      :class="
        route.path === menu.path
          ? 'text-primary-blue'
          : 'text-primary-light hover:text-primary-blue'
      "
    >
      <Icon :name="menu.icon" size="22" />
      <span class="text-[8px] font-medium text-center">{{ menu.title }}</span>
    </NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
const route = useRoute();
const { dataMenu } = useMenu();
</script>
