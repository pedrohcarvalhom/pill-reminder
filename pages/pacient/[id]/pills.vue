<template>
  <main class="container">
    <div>
      <a class="cursor-pointer" @click="$router.back">
        <Icon class="w-6 h-6 text-red-500 mb-6" name="ri:arrow-left-line" />
      </a>
    </div>
    <div v-if="status == 'pending'" class="w-full flex justify-center">
      <pills-loading-skeleton />
    </div>
    <div v-if="status == 'error'" class="w-full flex justify-center">
      <span class="text-2xl font-bold"><span class="text-red-500">Erro</span> ao carregar os remédios</span>
    </div>
    <div v-if="status == 'success'" class="w-full flex justify-center">
      <div v-if="!pills.length">
        <PillsEmptyState
          :selected-pacient="pacient"
          @created="refresh"
        />
      </div>
      <div v-else class="w-full h-screen">
        <div class="flex justify-between items-center">
          <div>
            <span class="block text-2xl font-bold mb-1">
              Remédios de <span class="text-red-500">{{ pacient.name }}</span>
            </span>
            <span class="text-sm">{{ pacient.description }}</span>
          </div>
          <div>
            <CommonsActionButtons @share="copyLink" />
          </div>
        </div>
        <hr class="my-4">
        <div class="w-full flex justify-end">
          <Button class="ml-auto" @click="isRegisteringPill = true">
            {{ $t('pills.newPill') }}
          </Button>
        </div>
        <MedicinesList :pills="pills" @on-deleted="refresh" />
        <PillsCreate
          v-model="isRegisteringPill"
          :pacients="[pacient]"
          @created="isRegisteringPill = false; refresh()"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { useUserStore } from '~/store/user';
import type { PillResponse, Pill } from '~/types/types';

const { id } = useRoute().params;
const { user, isLoaded } = storeToRefs(useUserStore());
const pills = ref<PillResponse[]>([]);
const pacient = ref();
const isRegisteringPill = ref(false);
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
          id: h.id,
          time: h.time,
          checked: h.checked,
          checkedAt: h.checkedAt,
        }
      })
    }
  })
}

const config = useRuntimeConfig();
const { copy } = useClipboard();
async function copyLink() {
  if (!isLoaded.value || !user.value) return;

  const url = `${config.public.baseUrl}/pacient/${id}?createPacient=true&invitedBy=${user.value?.email}`
  try {
    await copy(url);
    window.alert('Link copiado com sucesso!\nCompartilhe ele com outros usuários que devam acessar os dados deste paciente.')
  } catch (error) {
    window.alert("Ocorreu um erro ao copiar o link. Tente novamente")
  }
}
</script>
