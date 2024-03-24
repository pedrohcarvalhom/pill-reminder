<template lang="pug">
label(class="text-red-500 font-bold" :for="id.toString()") {{ props.label }}
Checkbox(:id="id.toString()" :checked="props.checked" class="rounded-full dark:bg-gray-500 checked:text-green-500")
</template>

<script setup lang="ts">
import { Checkbox } from '../ui/checkbox';
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  id: {
    type: [Number],
    required: true
  },
  isChecked: {
    type: Boolean,
    default: false
  }
})
</script>