<template>
<main class="container">
  <div v-if="status == 'pending'" class="w-full flex justify-center">
    <span>Carregando os remédios..</span>
  </div>
  <div v-if="status == 'error'" class="w-full flex justify-center">
    <span>Erro ao carregar os remédios</span>
  </div>
  <div v-if="status == 'success'" class="w-full flex justify-center">
    <div v-if="!pills.length">
      <PillsEmptyState :selected-pacient="pacient" @created="refresh"/>
    </div>
    <div v-else>
      <MedicinesList :pills="pills"/>
    </div>
  </div>
</main>
</template>

<script setup lang="ts">
import type { PillResponse, Pill } from '~/types/types';

const { id } = useRoute().params;
const pills = ref<PillResponse[]>([]);
const pacient = ref();
const { status, refresh } = await useFetch(`/api/pacient/${id}/pills`, {
  method: 'GET',
  transform: ({ pacient: pacientRequest, pills: pillsRequest }) => {
    pills.value = parsePills(pillsRequest as Pill[]) as unknown as PillResponse[];
    pacient.value = {
      id: pacientRequest.id,
      name: pacientRequest.name,
      description: pacientRequest.description,
    };
  }
});

function parsePills(pills: Pill[]) {
  return pills.map((pill) => {
    return {
      ...pill,
      id: pill.id.toString(),
      hours: pill.hour.map((h) => {
        return {
          time: h.time,
          checked: h.checked,
          checkedAt: h.checkedAt,
        }
      })
    }
  })
}
</script>