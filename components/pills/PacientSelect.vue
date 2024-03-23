<template>
  <div class="card flex justify-content-center">
    <PrimeDropdown
      v-model="selectedPacient" :options="pacientOptions" option-label="name" option-value="id"
      placeholder="Selecione o paciente" class="w-full md:w-14rem"
      :pt="{ root: ({ }) => { return 'border border-stone-200' } }"
    />
  </div>
</template>

<script setup lang="ts">
import type { PacientResponse } from "~/types/types";

const props = defineProps({
  pacients: {
    type: Array as PropType<PacientResponse[]>,
    default: () => []
  },
  pacientSelected: {
    type: Object,
    default: undefined
  }
});

const pacientOptions = computed(() => {
  return props.pacientSelected ? [props.pacientSelected] : props.pacients
})
const selectedPacient = defineModel({ default: undefined, type: Number });
</script>