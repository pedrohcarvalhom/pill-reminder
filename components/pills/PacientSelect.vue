<template>
  <div class="card flex justify-content-center">
    <PrimeDropdown v-model="selectedPacient" :options="props.pacients" optionLabel="name" optionValue="id"
      placeholder="Selecione o paciente" class="w-full md:w-14rem"
      :pt="{ root: ({ }) => { return 'border border-stone-200' } }" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PacientResponse } from "~/types/types";

const props = defineProps({
  pacients: {
    type: Array as PropType<PacientResponse[]>,
    required: true
  }
})
const selectedPacient = defineModel({ default: undefined, type: Number });
</script>