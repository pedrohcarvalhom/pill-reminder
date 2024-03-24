<template>
  <Card class="w-full bg-gray-100 shadow-lg dark:bg-gray-100">
    <CardContent class="flex flex-col py-2">
      <div v-for="(hour, index) in props.hours" :key="index" class="flex justify-between my-3">
        <checkbox-label :id="index" :label="hour.time!" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { HourResponse } from '~/types/types';
import CheckboxLabel from '../commons/CheckboxLabel.vue';

const props = defineProps({
  hours: {
    type: Array as PropType<HourResponse[]>,
    required: true
  },
});
</script>