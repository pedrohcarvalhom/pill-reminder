<template>
  <div class="w-full h-screen flex items-center justify-center bg-red-950">
    <Card class="w-[90vw] bg-gray-100 dark:bg-gray-800">
      <AuthRegister v-if="!haveAccount" @have-account="haveAccount = true" />
      <AuthLogin v-else @dont-have-account="haveAccount = false" />
    </Card>
  </div>
</template>

<script setup lang="ts">
const haveAccount = ref(true);
</script>