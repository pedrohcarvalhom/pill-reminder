<template>
  <Card class="flex justify-between items-center w-full h-20 p-2 my-1 border border-b-slate-100">
    <div
      class="flex items-center gap-4 cursor-pointer"
      @click="goToPacientPills"
    >
      <div class="h-10 w-10 bg-red-500 rounded-full" />
      <div>
        <CardTitle>{{ props.pacient.name }}</CardTitle>
        <CardDescription class="mt-2">
          {{ props.pacient.pills.length }} {{
            pluralizePill(props.pacient.pills.length) }} • {{ pacientUsers(props.pacient.users) }}
        </CardDescription>
      </div>
    </div>
    <div class="flex gap-4">
      <PacientDropdown @on-delete="onDeleteClicked" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import type { PropType } from 'vue';
import { usePacientService } from '~/composables/usePacientService';
import type { PacientResponse, UsersResponse } from '~/types/types';

const props = defineProps({
  pacient: {
    type: Object as PropType<PacientResponse>,
    required: true
  }
})
const emit = defineEmits(['on-deleted']);
const { deletePacient } = usePacientService();

function pluralizePill(quantity: number) {
  if (quantity === 0) return 'remédios';
  return quantity > 1 ? 'remédios' : 'remédio';
}

function pacientUsers(users: UsersResponse[]) {
  if (users.length === 0) return 'nenhum cuidador';

  return users.length > 1 ? `${users.length} cuidadores` : '1 cuidador';
}

function goToPacientPills() {
  navigateTo(`/pacient/${props.pacient.id}/pills`);
}

async function onDeleteClicked() {
  try {
    await deletePacient(Number(props.pacient.id));
    window.alert('Paciente deletado com sucesso!');

    emit('on-deleted');
  } catch (error) {
    console.error(error);
    window.alert("Ocorreu um erro ao deletar o paciente. Tente novamente");
  }
}
</script>