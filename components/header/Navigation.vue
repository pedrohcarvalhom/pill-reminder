<template lang="pug">
div(class="m-3 flex items-center gap-4 justify-between")
  avatar
    avatar-image(src="https://github.com/radix-vue.png" alt="@radix-vue")
    avatar-fallback
  h1(class="text-2xl font-medium mr-4") {{ $t('Welcome') }}
  Icon(class="h-8 w-8" name="flat-color-icons:settings")
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

defineEmits(['open-sidebar'])
</script>