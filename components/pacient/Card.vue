<template>
  <Card class="flex justify-between items-center w-full h-20 p-2 my-1 border border-b-slate-100">
    <div class="flex items-center gap-4">
      <div class="h-10 w-10 bg-red-500 rounded-full"></div>
      <div>
        <CardTitle>{{ props.pacient.name }}</CardTitle>
        <CardDescription class="mt-2">{{ props.pacient.pills.length }} {{
          pluralizePill(props.pacient.pills.length) }} • {{ pacientUsers(props.pacient.users) }} </CardDescription>
      </div>
    </div>
    <div class="flex gap-4">
      <PacientDropdown />
    </div>
  </Card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { PacientResponse, UsersResponse } from '~/types/types';

const props = defineProps({
  pacient: {
    type: Object as PropType<PacientResponse>,
    required: true
  }
})

function pluralizePill(quantity: number) {
  if (quantity === 0) return 'remédios';
  return quantity > 1 ? 'remédios' : 'remédio';
}

function pacientUsers(users: UsersResponse[]) {
  if (users.length === 0) return 'nenhum cuidador';

  return users.length > 1 ? `${users.length} cuidadores` : '1 cuidador';
}
</script>