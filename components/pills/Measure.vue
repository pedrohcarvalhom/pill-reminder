<template lang="pug">
Card(class="w-48 bg-gray-100 shadow-lg dark:bg-gray-100")
  CardContent(class="h-full py-0 px-2 flex gap-5")
    div(class="flex items-center justify-center")
      Icon(class="w-10 h-10" name="openmoji:medication")
    div(class="flex flex-col items-center justify-center mr-auto")
      span(class="font-bold dark:text-gray-900") {{ props.quantity }} {{ MeasureEnum[props.measure] }}
      span(class="ml-2 dark:text-gray-900") {{ props.time }}

</template>

<script setup lang="ts">
import { MeasureEnum } from '~/types/types';
const props = defineProps({
  quantity: {
    type: Number,
    required: true
  },
  measure: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});
</script>