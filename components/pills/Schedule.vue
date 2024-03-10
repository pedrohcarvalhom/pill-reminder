<template lang="pug">
Card(class="w-full bg-gray-100 shadow-lg")
  CardContent(class="flex flex-col py-2")
    div(v-for="hour in hours" :key="hour.id" class="flex justify-between my-3")
      checkbox-label(:id="hour.id" :label="hour.label")
</template>

<script setup lang="ts">
import CheckboxLabel from '../commons/CheckboxLabel.vue';
const hours = ref([
  {
    id: 1,
    label: '10:00 AM'
  },
  {
    id: 2,
    label: '12:00 AM'
  },
  {
    id: 3,
    label: '14:00 PM'
  }
])
</script>