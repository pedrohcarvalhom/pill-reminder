<template>
  <div
    class="p-2 flex items-center gap-4 justify-between border border-b-stone-200 border-r-0 border-l-0 border-t-0 md:h-14 dark:bg-transparent dark:border-b-stone-100"
  >
    <Icon
      class="w-8 h-8 text-red-500 dark:text-red-700"
      name="fa6-solid:circle-user"
    />
    <span
      v-if="userStore.isLoaded"
      class="text-xl font-medium mr-4 dark:text-white"
    >
      {{ $t('Welcome') }} {{ firstName }}
    </span>
    <HeaderItems />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const firstName = computed(() => userStore.userName.split(' ')[0])
defineEmits(['open-sidebar'])
</script>