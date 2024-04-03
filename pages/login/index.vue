<template>
  <div class="w-full h-screen flex items-center justify-center">
    <Card class="w-[90vw] lg:w-[500px] bg-gray-100 shadow-lg dark:bg-gray-800">
      <AuthRegister
        v-if="!haveAccount"
        @have-account="haveAccount = true"
      />
      <AuthLogin
        v-else
        @dont-have-account="haveAccount = false"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
});
const haveAccount = ref(true);
</script>