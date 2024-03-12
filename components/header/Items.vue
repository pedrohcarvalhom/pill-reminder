<template>
  <div class="card flex justify-content-center">
    <PrimeSidebar v-model:visible="visible" position="right" header="Sidebar">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.</p>
    </PrimeSidebar>
    <Icon class="w-6 h-6" name="flat-color-icons:settings" @click="visible = true" />
  </div>
</template>

<script setup lang="ts">
const visible = ref(false)
</script>