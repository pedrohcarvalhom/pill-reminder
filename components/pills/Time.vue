<template lang="pug">
Card(class="w-48 h-24 bg-gray-100 shadow-lg dark:bg-gray-100")
  CardContent(class="h-full py-2 px-2 flex gap-5")
    div(class="flex items-center justify-center")
      Icon(class="w-8 h-8" name="noto:alarm-clock")
    div(class="flex flex-col items-center justify-center mr-auto")
      span(class="font-bold ml-2 dark:text-gray-900") {{ props.quantity || '1' }} {{ props.quantity > 1 ? 'vezes' : 'vez' }}
      span(class="text-sm dark:text-gray-900 ml-2") por semana

</template>

<script setup lang="ts">
const props = defineProps({
  quantity: {
    type: String,
    required: true
  }
})
</script>