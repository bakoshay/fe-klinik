<template>
  <div class="p-8 space-y-8 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Button Component Demo</h1>

    <!-- Sizes -->
    <section class="border p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Sizes</h2>
      <div class="flex gap-4 items-center flex-wrap">
        <BaseButton size="xs" label="Extra Small" color="primary-blue" />
        <BaseButton size="sm" label="Small" color="primary-blue" />
        <BaseButton size="md" label="Medium" color="primary-blue" />
        <BaseButton size="lg" label="Large" color="primary-blue" />
        <BaseButton size="xl" label="Extra Large" color="primary-blue" />
      </div>
    </section>

    <!-- Colors -->
    <section class="border p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Colors (Contained)</h2>
      <div class="flex gap-4 flex-wrap">
        <BaseButton color="primary" label="Primary" />
        <BaseButton color="primary-blue" label="Primary Blue" />
        <BaseButton color="primary-dark" label="Primary Dark" />
        <BaseButton color="primary-light" label="Primary Light" />
        <BaseButton color="primary-gray" label="Primary Gray" />
        <BaseButton color="danger" label="Danger" />
        <BaseButton color="success" label="Success" />
        <BaseButton color="warning" label="Warning" />
        <BaseButton color="secondary" label="Secondary" />
      </div>
    </section>

    <!-- Variants -->
    <section class="border p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Variants</h2>
      <div class="space-y-6">
        <div>
          <h3 class="font-semibold mb-3 text-gray-600">Contained</h3>
          <div class="flex gap-4 flex-wrap">
            <BaseButton variant="contained" color="primary-blue" label="Primary Blue" />
            <BaseButton variant="contained" color="danger" label="Danger" />
            <BaseButton variant="contained" color="success" label="Success" />
            <BaseButton variant="contained" color="warning" label="Warning" />
          </div>
        </div>
        <div>
          <h3 class="font-semibold mb-3 text-gray-600">Outlined</h3>
          <div class="flex gap-4 flex-wrap">
            <BaseButton variant="outlined" color="primary-blue" label="Primary Blue" />
            <BaseButton variant="outlined" color="danger" label="Danger" />
            <BaseButton variant="outlined" color="success" label="Success" />
            <BaseButton variant="outlined" color="warning" label="Warning" />
          </div>
        </div>
        <div>
          <h3 class="font-semibold mb-3 text-gray-600">Text</h3>
          <div class="flex gap-4 flex-wrap">
            <BaseButton variant="text" color="primary-blue" label="Primary Blue" />
            <BaseButton variant="text" color="danger" label="Danger" />
            <BaseButton variant="text" color="success" label="Success" />
            <BaseButton variant="text" color="warning" label="Warning" />
          </div>
        </div>
        <div>
          <h3 class="font-semibold mb-3 text-gray-600">Ghost</h3>
          <div class="flex gap-4 flex-wrap">
            <BaseButton variant="ghost" color="primary-blue" label="Primary Blue" />
            <BaseButton variant="ghost" color="danger" label="Danger" />
            <BaseButton variant="ghost" color="success" label="Success" />
            <BaseButton variant="ghost" color="warning" label="Warning" />
          </div>
        </div>
      </div>
    </section>

    <!-- Rounded -->
    <section class="border p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Rounded Corners</h2>
      <div class="flex gap-4 flex-wrap items-center">
        <BaseButton rounded="none" color="primary-blue" label="None" />
        <BaseButton rounded="sm" color="primary-blue" label="Small" />
        <BaseButton rounded="md" color="primary-blue" label="Medium" />
        <BaseButton rounded="lg" color="primary-blue" label="Large" />
        <BaseButton rounded="full" color="primary-blue" label="Full" />
      </div>
    </section>

    <!-- With Icons -->
    <section class="border p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">With Icons</h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-semibold mb-3 text-gray-600">Icon Left</h3>
          <div class="flex gap-4 flex-wrap">
            <BaseButton color="primary-blue" label="Add">
              <template #icon-left>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </template>
            </BaseButton>
            <BaseButton color="success" label="Save">
              <template #icon-left>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </template>
            </BaseButton>
            <BaseButton color="danger" label="Delete">
              <template #icon-left>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </template>
            </BaseButton>
          </div>
        </div>
        <div>
          <h3 class="font-semibold mb-3 text-gray-600">Icon Right</h3>
          <div class="flex gap-4 flex-wrap">
            <BaseButton color="primary-blue" label="Next">
              <template #icon-right>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </template>
            </BaseButton>
            <BaseButton color="primary-dark" label="Continue">
              <template #icon-right>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </template>
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Icon Only -->
    <section class="border p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Icon Only Buttons</h2>
      <div class="flex gap-4 flex-wrap items-center">
        <BaseButton color="primary-blue" rounded="full" size="sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </BaseButton>
        <BaseButton color="success" rounded="full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </BaseButton>
        <BaseButton color="danger" rounded="full" size="lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </BaseButton>
        <BaseButton variant="outlined" color="primary-blue" rounded="full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </BaseButton>
      </div>
    </section>

    <!-- Disabled -->
    <section class="border p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Disabled State</h2>
      <div class="flex gap-4 flex-wrap">
        <BaseButton color="primary-blue" label="Disabled" disabled />
        <BaseButton color="danger" label="Disabled" disabled />
        <BaseButton variant="outlined" color="success" label="Disabled" disabled />
        <BaseButton variant="text" color="warning" label="Disabled" disabled />
      </div>
    </section>

    <!-- Full Width -->
    <section class="border p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Full Width</h2>
      <BaseButton color="primary-blue" label="Full Width Button" class="w-full" size="lg" />
    </section>

    <!-- Interactive Example -->
    <section class="border p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Interactive Example</h2>
      <div class="flex gap-4 flex-wrap">
        <BaseButton color="primary-blue" label="Click Me" @click="handleClick" />
        <BaseButton color="success" label="Success Action" @click="handleClick">
          <template #icon-left>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </template>
        </BaseButton>
      </div>
      <p v-if="clickCount > 0" class="mt-4 text-gray-600">
        Button clicked {{ clickCount }} time{{ clickCount > 1 ? 's' : '' }}!
      </p>
    </section>

  </div>
</template>

<script setup lang="ts">
const clickCount = ref(0);

const handleClick = () => {
  clickCount.value++;
};
</script>
