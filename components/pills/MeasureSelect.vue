<template>
  <div class="card flex justify-content-center">
    <PrimeDropdown
      v-model="selectedMeasure"
      :options="cities"
      option-label="name"
      option-value="code"
      placeholder="Selecione a medida"
      class="w-full md:w-14rem"
      :pt="{ root: ({ }) => { return 'border border-stone-200' } }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedMeasure = defineModel({ default: '', type: String });
const cities = ref([
  { name: 'Mg', code: 'mg' },
  { name: 'Grama', code: 'gr' },
  { name: 'Ml (Mililitros)', code: 'ml' },
  { name: 'Inteiro', code: 'full' },
  { name: 'Metade', code: 'half' },
  { name: 'Gotas', code: 'drops' },
]);
</script>