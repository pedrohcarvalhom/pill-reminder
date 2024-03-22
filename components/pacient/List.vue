<template>
  <div v-for="pacient in props.pacients" :key="pacient.id">
    <div class="flex flex-col mx-2">
      <PacientCard />
    </div>
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
})
</script>