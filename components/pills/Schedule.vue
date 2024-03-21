<template>
  <Card class="w-full bg-gray-100 shadow-lg dark:bg-gray-100">
    <CardContent class="flex flex-col py-2">
      <div v-for="(hour, index) in getHoursFromPill(Number(props.pillId))" :key="index" class="flex justify-between my-3">
        <checkbox-label :id="index" :label="hour" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import CheckboxLabel from '../commons/CheckboxLabel.vue';
import { usePillStore } from '~/store/pill';

const props = defineProps({
  pillId: {
    type: String,
    required: true
  },
})
const { getHoursFromPill } = storeToRefs(usePillStore());
</script>