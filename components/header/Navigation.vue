<template>
  <div class="m-3 flex items-center gap-4 justify-between">
    <Icon class="w-8 h-8 text-green-500" name="fa6-solid:circle-user" />
    <span v-if="userStore.isLoaded" class="text-xl font-medium mr-4"> {{ $t('Welcome') }} {{ firstName }}</span>
    <HeaderItems />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const firstName = computed(() => userStore.userName.split(' ')[0])
defineEmits(['open-sidebar'])
</script>