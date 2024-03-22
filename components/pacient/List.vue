<template>
  <div v-if="anyPacientHavePill">
    <div class="flex justify-between w-full items-center p-2">
      <div class="flex flex-col">
        <span class="ml-2 text-2xl font-semibold">Seus pacientes</span>
        <caption class="inline-flex ml-2 text-sm font-normal text-stone-500 dark:text-stone-400">
          Clique em algum paciente para acessar mais informações
        </caption>
      </div>
      <PacientDialog :button-label="'+ Novo paciente'" @created="$emit('created')" />
    </div>
    <div v-for="pacient in props.pacients" :key="pacient.id">
      <div class="flex flex-col mx-2 my-1">
        <PacientCard :pacient="pacient" />
      </div>
    </div>
  </div>
  <div v-else>
    <PillsEmptyState :pacients="props.pacients" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { PacientResponse } from '@/types/types.ts'

const props = defineProps({
  pacients: {
    type: Array as PropType<PacientResponse[]>,
    required: true
  }
});
const anyPacientHavePill = computed(() => {
  return props.pacients.some(pacient => pacient.pills.length > 0)
});
defineEmits(['created'])
</script>