<template>
  <div>
    <Icon
      class="w-6 h-6 mx-2 cursor-pointer text-black dark:text-slate-200 hover:text-red-600 transition-all duration-300"
      name="gridicons:share-ios" @click="$emit('share')" />
    <Icon class="w-6 h-6 cursor-pointer text-black dark:text-slate-200 hover:text-red-600 transition-all duration-300"
      name="gridicons:pencil" @click="$emit('edit')">
    </Icon>
  </div>
</template>

<script setup lang="ts">
defineEmits(['edit', 'share'])
</script>