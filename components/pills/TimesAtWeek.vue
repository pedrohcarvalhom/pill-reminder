<template>
  <div class="card flex justify-content-center">
    <PrimeDropdown
      v-model="selectedDaysAtWeek"
      :options="days"
      option-label="name"
      option-value="code"
      placeholder="Selecione quantas vezes na semana?"
      class="w-full md:w-14rem"
      :pt="{ root: ({ }) => { return 'border border-stone-200' } }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedDaysAtWeek = defineModel({ default: 0, type: Number });
const days = ref([
  { name: 'Todos os dias', code: 7 },
  { name: '6 vezes por semana', code: 6 },
  { name: '5 vezes por semana', code: 5 },
  { name: '4 vezes por semana', code: 4 },
  { name: '3 vezes por semana', code: 3 },
  { name: '2 vezes por semana', code: 2 },
  { name: '1 vez por semana', code: 1 },
]);
</script>