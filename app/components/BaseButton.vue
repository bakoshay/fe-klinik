<template>
  <button :type="type" :class="buttonClasses" :disabled="disabled" @click="$emit('click', $event)">
    <slot name="icon-left" />
    <span v-if="label">{{ label }}</span>
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  size: {
    type: String as () => 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    default: 'md',
  },
  variant: {
    type: String as () => 'contained' | 'outlined' | 'text' | 'ghost',
    default: 'contained',
  },
  color: {
    type: String as () =>
      | 'primary'
      | 'primary-blue'
      | 'primary-dark'
      | 'primary-light'
      | 'primary-gray'
      | 'danger'
      | 'success'
      | 'warning'
      | 'secondary',
    default: 'primary',
  },
  rounded: {
    type: String as () => 'none' | 'sm' | 'md' | 'lg' | 'full',
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
});

defineEmits(['click']);

const sizeClass = computed(() => {
  const sizes = {
    xs: 'text-xs px-2 py-1 font-medium',
    sm: 'text-sm px-2.5 py-1.5 font-medium',
    md: 'text-sm px-4 py-2 font-bold',
    lg: 'text-base px-5 py-2.5 font-bold',
    xl: 'text-lg px-6 py-3 font-bold',
  };
  return sizes[props.size] || sizes.md;
});

const roundedClass = computed(() => {
  const rounded = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };
  return rounded[props.rounded] || rounded.md;
});

const variantColorClasses = computed(() => {
  const color = props.color;
  const variant = props.variant;

  // Contained variant
  if (variant === 'contained') {
    const containedClasses = {
      primary: 'bg-[#c5dbed] text-[#273a53] border-[#c5dbed] hover:bg-[#b0cfe0]',
      'primary-blue': 'bg-[#598af2] text-white border-[#598af2] hover:bg-[#4a7be0]',
      'primary-dark': 'bg-[#273a53] text-white border-[#273a53] hover:bg-[#1f2f42]',
      'primary-light': 'bg-[#fffdfd] text-[#273a53] border-[#dae0e5] hover:bg-[#f5f5f5]',
      'primary-gray': 'bg-[#dae0e5] text-[#273a53] border-[#dae0e5] hover:bg-[#cbd3d9]',
      danger: 'bg-red-500 text-white border-red-500 hover:bg-red-600',
      success: 'bg-green-500 text-white border-green-500 hover:bg-green-600',
      warning: 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600',
      secondary: 'bg-gray-500 text-white border-gray-500 hover:bg-gray-600',
    };
    return containedClasses[color] || containedClasses['primary'];
  }

  // Outlined variant
  if (variant === 'outlined') {
    const outlinedClasses = {
      primary:
        'bg-transparent text-[#c5dbed] border-[#c5dbed] hover:bg-[#c5dbed] hover:text-[#273a53]',
      'primary-blue':
        'bg-transparent text-[#598af2] border-[#598af2] hover:bg-[#598af2] hover:text-white',
      'primary-dark':
        'bg-transparent text-[#273a53] border-[#273a53] hover:bg-[#273a53] hover:text-white',
      'primary-light': 'bg-transparent text-[#273a53] border-[#dae0e5] hover:bg-[#fffdfd]',
      'primary-gray': 'bg-transparent text-[#273a53] border-[#dae0e5] hover:bg-[#dae0e5]',
      danger: 'bg-transparent text-red-500 border-red-500 hover:bg-red-500 hover:text-white',
      success: 'bg-transparent text-green-500 border-green-500 hover:bg-green-500 hover:text-white',
      warning: 'bg-transparent text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-white',
      secondary: 'bg-transparent text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white',
    };
    return outlinedClasses[color] || outlinedClasses['primary'];
  }

  // Text variant
  if (variant === 'text') {
    const textClasses = {
      primary: 'bg-transparent text-[#c5dbed] border-transparent hover:bg-[#c5dbed]/10',
      'primary-blue': 'bg-transparent text-[#598af2] border-transparent hover:bg-[#598af2]/10',
      'primary-dark': 'bg-transparent text-[#273a53] border-transparent hover:bg-[#273a53]/10',
      'primary-light': 'bg-transparent text-[#273a53] border-transparent hover:bg-gray-100',
      'primary-gray': 'bg-transparent text-[#273a53] border-transparent hover:bg-[#dae0e5]/20',
      danger: 'bg-transparent text-red-500 border-transparent hover:bg-red-50',
      success: 'bg-transparent text-green-500 border-transparent hover:bg-green-50',
      warning: 'bg-transparent text-amber-500 border-transparent hover:bg-amber-50',
      secondary: 'bg-transparent text-gray-500 border-transparent hover:bg-gray-100',
    };
    return textClasses[color] || textClasses['primary'];
  }

  // Ghost variant
  if (variant === 'ghost') {
    const ghostClasses = {
      primary: 'bg-transparent text-[#273a53] border-transparent hover:bg-gray-100',
      'primary-blue': 'bg-transparent text-[#598af2] border-transparent hover:bg-blue-50',
      'primary-dark': 'bg-transparent text-[#273a53] border-transparent hover:bg-gray-100',
      'primary-light': 'bg-transparent text-[#273a53] border-transparent hover:bg-gray-50',
      'primary-gray': 'bg-transparent text-[#273a53] border-transparent hover:bg-gray-100',
      danger: 'bg-transparent text-red-600 border-transparent hover:bg-red-50',
      success: 'bg-transparent text-green-600 border-transparent hover:bg-green-50',
      warning: 'bg-transparent text-amber-600 border-transparent hover:bg-amber-50',
      secondary: 'bg-transparent text-gray-600 border-transparent hover:bg-gray-100',
    };
    return ghostClasses[color] || ghostClasses['primary'];
  }

  return '';
});

const buttonClasses = computed(() => {
  const baseClasses =
    'transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border-2';
  const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover-lift';

  return [
    baseClasses,
    sizeClass.value,
    roundedClass.value,
    variantColorClasses.value,
    disabledClass,
  ]
    .filter(Boolean)
    .join(' ');
});
</script>

<style scoped>
button.hover-lift:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

button.hover-lift:active {
  transform: translateY(0);
}
</style>
