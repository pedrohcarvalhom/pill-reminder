<template>
  <div class="m-3 flex items-center gap-4 justify-between">
    <Avatar>
      <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
      <AvatarFallback>
      </AvatarFallback>
    </Avatar>
    <span v-if="userStore.isLoaded" class="text-xl font-medium mr-4"> {{ $t('Welcome') }} {{ firstName }}</span>
    <HeaderItems />
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const firstName = computed(() => userStore.userName.split(' ')[0])
defineEmits(['open-sidebar'])
</script>