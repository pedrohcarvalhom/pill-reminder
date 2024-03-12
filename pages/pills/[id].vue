<template lang="pug">
main
  header(class="mb-10")
    nuxt-link(to="/")
      Icon(class="w-8 h-8 text-red-500 ml-2 my-1" name="ri:arrow-left-line")
  div.mx-4
    div(class="w-20 h-20 rounded-full bg-red-500")
    div(class="flex items-center justify-between my-8")
      div(class="flex flex-col")
        span(class="text-2xl font-bold") Nome do remédio
        span(class="text-lg font-medium") Tipo do remedio - 20mg
      div
        Icon(class="w-8 h-8" name="emojione:pencil")
    div(class="flex gap-2 mb-4")
      pills-measure
      pills-time
    div(class="flex justify-between items-center my-4")
      span(class="text-2xl font-bold text-black dark:text-white") {{ $t('pills.schedule') }}
      a(class="flex items-center justify-center transition-all duration-150 ease-in-out" @click="editing = true")
        icon(class="text-red-500 mb-1 mr-1 w-5 h-5" :class="{'animate-bounce': editing}"  name="mdi:pencil-plus-outline" )
        span(class="text-lg font-bold mr-1 text-red-500 dark:text-red-300" :class="{'animate-bounce': editing}") {{ editing ? 'Editando...' : $t('buttons.edit') }}
    div.mt-2
      div(v-show="editing" class="flex items-center gap-2")
        Input(v-model="timeSelected" type="time" class="my-2 ml-auto w-40 bg-red-50")
        div
          a
            Icon(name="icon-park-solid:check-one" class="w-8 h-8 transition-all duration-150 ease-in-out" :class="timeSelected ? 'text-green-500' : 'text-gray-400'")
          a(@click="editing = false")
            Icon(name="icon-park-solid:close-one" class="w-8 h-8 text-red-500")
      pills-schedule
</template>

<script setup lang="ts">
import { Input } from '~/components/ui/input';

const editing = ref(false);
const timeSelected = ref("");
</script>