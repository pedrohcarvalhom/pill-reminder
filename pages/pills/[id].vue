<template>
  <main class="md:container md:h-screen">
    <div v-if="status == 'success'">
      <header class="mb-10">
        <a class="cursor-pointer" @click="router.back">
          <Icon class="w-8 h-8 text-red-500 ml-2 my-1" name="ri:arrow-left-line"></Icon>
        </a>
      </header>
      <div class="mx-4">
        <div class="w-20 h-20 rounded-full bg-red-500"></div>
        <div class="flex items-center justify-between my-8">
          <div class="flex flex-col">
            <span class="text-2xl font-bold">{{ data?.pill.name }}</span>
            <span class="text-lg font-medium">{{ data?.pill.description || '-' }}</span>
          </div>
          <div class="flex gap-4">
            <Icon class="w-8 h-8 cursor-pointer text-black dark:text-slate-200 hover:text-red-600 transition-all duration-300" name="gridicons:share-ios" @click="copyLink" />
            <Icon class="w-8 h-8 text-black dark:text-slate-200" name="gravity-ui:pencil-to-line"></Icon>
          </div>
        </div>
        <div class="flex gap-2 mb-4">
          <pills-measure :measure="data?.pill.measure" :quantity="data?.pill.quantity" time="Por dia" />
          <pills-time :quantity="data?.pill.when" />
        </div>
        <div class="flex justify-between items-center my-4">
          <span class="text-2xl font-bold text-black dark:text-white">{{
            $t('pills.schedule') }}
          </span>
          <a
            class="flex items-center justify-center transition-all duration-150 ease-in-out cursor-pointer"
            @click="editing = true"
          >
            <icon class="text-red-500 mb-1 mr-1 w-5 h-5" name="mdi:pencil-plus-outline" />
            <span
              class="text-lg font-bold mr-1 text-red-500 dark:text-red-300">
              {{ editing ? 'Editando...' : $t('buttons.edit') }}
            </span>
          </a>
        </div>
        <PillsAddHour :editing="editing" :pill-id="id" @cancel="editing = false" />
        <pills-schedule :hours="data?.pill.hour" :pill-id="id" />
      </div>
    </div>
    <div v-else-if="status == 'pending' || status == 'idle'">
      <span class="text-2xl font-bold dark:text-white">Carregando o seu remedio...</span>
    </div>
    <div v-else-if="status == 'error'">
      <span class="text-2xl font-bold text-red-600 dark:text-red-400">Erro ao carregar o seu remedio</span>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const router = useRouter();
const { id } = useRoute().params;
const { data, status } = await useFetch(`/api/pills/${id}`, {
  method: 'GET',
});
const editing = ref(false);

const { copy } = useClipboard();
const url = `http://localhost:3000/5/pacients/4&createPacient=true`
async function copyLink() {
  try {
    await copy(url);
    window.alert('Link copiado com sucesso!')
  } catch (error) {
    window.alert("Ocorreu um erro ao copiar o link. Tente novamente")
  }
}
</script>