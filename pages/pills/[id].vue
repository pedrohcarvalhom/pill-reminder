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
    span(class="text-lg font-bold text-black dark:text-white") {{ $t('pills.schedule') }}
    div.mt-2
      pills-schedule
</template>

<script setup lang="ts">
</script>