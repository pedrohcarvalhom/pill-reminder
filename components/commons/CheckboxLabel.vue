<template lang="pug">
label(class="text-red-500 font-bold" :for="id.toString()") {{ props.label }}
Checkbox(:id="id.toString()" class="rounded-full")
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
  }
})
</script>