<template lang="pug">
div(class="m-3 flex items-center gap-4 justify-between")
  avatar
    avatar-image(src="https://github.com/radix-vue.png" alt="@radix-vue")
    avatar-fallback
  h1(class="text-2xl font-medium mr-4") {{ $t('Welcome') }}
  header-items
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

defineEmits(['open-sidebar'])
</script>