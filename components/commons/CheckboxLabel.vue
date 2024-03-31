<template lang="pug">
label(class="text-red-500 font-bold" :for="id.toString()") {{ props.label }}
Checkbox(:id="id.toString()" :checked="checkbox.checked" class="rounded-full dark:bg-gray-500 checked:text-green-500" @update:checked="updateChecked")
</template>

<script setup lang="ts">
import { Checkbox } from '../ui/checkbox';
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  id: {
    type: [Number, String],
    required: true
  },
  isChecked: {
    type: Boolean,
    default: false
  }
});

const checkbox = ref({
  checked: props.isChecked,
  id: props.id,
});

function updateChecked(checked: boolean) {
  checkbox.value.checked = checked;
  emit('update:checked', { checked, id: checkbox.value.id });
}

const emit = defineEmits(['update:checked']);
</script>