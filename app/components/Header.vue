<template>
  <header class="fixed top-0 left-0 right-0 w-full bg-primary px-6 py-4 shadow-md z-50">
    <nav class="flex justify-between items-center w-full">
      <div class="flex items-center gap-2">
        <img src="/images/logo.png" alt="Logo" class="size-9" />
        <h1 class="text-primary-dark font-extrabold text-lg">KLINIK VIRZA MEDIKA</h1>
      </div>

      <NuxtLink
        to="/login"
        class="cursor-pointer py-1.5 px-2.5 bg-primary-light rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <Icon name="line-md:account" size="28" />
      </NuxtLink>
    </nav>
  </header>
</template>

<script lang="ts" setup></script>
