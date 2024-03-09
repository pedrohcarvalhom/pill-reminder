<template lang="pug">
div
  h1 {{ $t('Welcome') }}
  ColorToggle
</template>


<script setup lang="ts">
import ColorToggle from './components/commons/ColorToggle.vue'
</script>