<template>
  <div class="m-3 flex items-center gap-4 justify-between">
    <Avatar>
      <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
      <AvatarFallback>
        <span class="text-2xl font-medium mr-4"> {{ $t('Welcome') }}</span>
        <HeaderItems />
      </AvatarFallback>
    </Avatar>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

defineEmits(['open-sidebar'])
</script>