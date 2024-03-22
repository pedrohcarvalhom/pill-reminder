<template>
  <div class="w-full md:w-[500px] md:mx-auto h-[50vh] flex flex-col items-center justify-center px-2">
    <span class="text-2xl font-bold my-2">Agora é hora de <span class="text-red-500">cadastrar os remédios.</span></span>
    <span class="text-center font-medium mb-4">
      Para isso, <span class="text-red-500">clique abaixo.</span> Lembrando que você poderá cadastrar mais remédios
      depois!
    </span>
    <Button @click="isRegisteringPill = true">+ Cadastrar remédio</Button>
    <PillsCreate v-model="isRegisteringPill" :pacients="props.pacients" />
  </div>
</template>

<script setup lang="ts">
import type { PacientResponse } from '~/types/types';

defineEmits(['created']);

const props = defineProps({
  pacients: {
    type: Array as PropType<PacientResponse[]>,
    required: true
  }
})
const isRegisteringPill = ref(false);
</script>