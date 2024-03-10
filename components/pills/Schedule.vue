<template lang="pug">
Card(class="w-full bg-gray-100 shadow-lg")
  CardContent(class="flex flex-col py-2")
    div(class="flex justify-between my-3")
      label(class="text-red-500 font-bold"  for="terms2") 10:00 AM
      Checkbox(id="terms2" class="rounded-full")
    div(class="flex justify-between my-3")
      label(class="text-red-500 font-bold" for="terms2") 12:00 AM
      Checkbox(id="terms2" class="rounded-full")
    div(class="flex justify-between my-3")
      label(class="text-red-500 font-bold" for="terms2") 14:00 AM
      Checkbox(id="terms2" class="rounded-full")
</template>

<script setup lang="ts">
import { Checkbox } from '../ui/checkbox';
</script>