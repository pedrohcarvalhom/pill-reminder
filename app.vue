<template lang="pug">
header
  header-navigation
main
  dates-list
  hr.my-4
  span(class="text-2xl ml-2") {{ $t('medicines.toTake') }}
  medicines-list.mt-4
</template>


<script setup lang="ts">
</script>