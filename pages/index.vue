<template lang="pug">
header
  header-navigation()
main
  dates-list
  hr.my-4
  div(class="flex justify-between items-center")
    span(class="text-2xl ml-4") {{ $t('medicines.toTake') }}
    a(class="mr-6 mt-1 text-red-500" @click="isRegisteringPill = !isRegisteringPill")
      span {{ $t('buttons.add') }}
  medicines-list.mt-4
  pills-create(v-model="isRegisteringPill")
</template>

<script setup lang="ts">
const isRegisteringPill = ref(false)
</script>