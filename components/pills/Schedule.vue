<template>
  <Card class="w-full bg-gray-100 shadow-lg dark:bg-gray-100">
    <CardContent class="flex flex-col py-2">
      <div v-for="(hour, index) in props.hours" :key="index" class="flex justify-between my-3">
        <checkbox-label :id="hour.id!" :is-checked="hour.checked" :label="hour.time!"
          @update:checked="debouncedSaveCheck" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { HourResponse } from '~/types/types';
import CheckboxLabel from '../commons/CheckboxLabel.vue';
import { usePillService } from '~/composables/usePillService';
import { useDebounceFn } from '@vueuse/core';

const { updateCheckedHour } = usePillService();
const props = defineProps({
  hours: {
    type: Array as PropType<HourResponse[]>,
    required: true
  },
  pillId: {
    type: String,
    required: true
  }
});

const debouncedSaveCheck = useDebounceFn(saveCheck, 800, { maxWait: 1000 });

async function saveCheck({ checked, id }: { checked: boolean, id: number }) {
  try {
    const updated = await updateCheckedHour(checked, id, Number(props.pillId));

    if (updated) emit('updated', checked);
  } catch (err) {
    window.alert("Ocorreu um erro ao atualizar o horário. Tente novamente")
    console.error(err);
  }
};

const emit = defineEmits(['updated']);
</script>