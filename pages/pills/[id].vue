<template>
  <main class="md:container md:h-screen">
    <div v-if="status == 'success'">
      <header class="mb-10">
        <nuxt-link to="/">
          <Icon class="w-8 h-8 text-red-500 ml-2 my-1" name="ri:arrow-left-line"></Icon>
        </nuxt-link>
      </header>
      <div class="mx-4">
        <div class="w-20 h-20 rounded-full bg-red-500"></div>
        <div class="flex items-center justify-between my-8">
          <div class="flex flex-col">
            <span class="text-2xl font-bold">{{ data?.pill.name }}</span>
            <span class="text-lg font-medium">Futura descrição do remédio</span>
          </div>
          <div>
            <Icon class="w-8 h-8" name="emojione:pencil"></Icon>
          </div>
        </div>
        <div class="flex gap-2 mb-4">
          <pills-measure :measure="data?.pill.measure" :quantity="data?.pill.quantity" time="Por dia" />
          <pills-time :measure="data?.pill.measure" :quantity="data?.pill.quantity" />
        </div>
        <div class="flex justify-between items-center my-4"><span class="text-2xl font-bold text-black dark:text-white">{{
          $t('pills.schedule') }}</span><a
            class="flex items-center justify-center transition-all duration-150 ease-in-out" @click="editing = true">
            <icon class="text-red-500 mb-1 mr-1 w-5 h-5" :class="{ 'animate-bounce': editing }"
              name="mdi:pencil-plus-outline"></icon><span class="text-lg font-bold mr-1 text-red-500 dark:text-red-300"
              :class="{ 'animate-bounce': editing }">{{ editing ? 'Editando...' : $t('buttons.edit') }}</span>
          </a></div>
        <div class="mt-2">
          <div v-show="editing" class="flex items-center gap-2">
            <Input v-model="timeSelected" class="my-2 ml-auto w-40 bg-red-50" type="time"></Input>
            <div><a>
                <Icon class="w-8 h-8 transition-all duration-150 ease-in-out" name="icon-park-solid:check-one"
                  :class="timeSelected ? 'text-green-500' : 'text-gray-400'"></Icon>
              </a><a @click="editing = false">
                <Icon class="w-8 h-8 text-red-500" name="icon-park-solid:close-one"></Icon>
              </a></div>
          </div>
          <pills-schedule></pills-schedule>
        </div>
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
import { Input } from '~/components/ui/input';

const { id } = useRoute().params;
const { data, status } = await useFetch(`/api/pills/${id}`, {
  method: 'GET',
});
const editing = ref(false);
const timeSelected = ref("");
</script>