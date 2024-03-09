<template lang="pug">
div(class="m-3 flex items-center gap-4")
  avatar
    avatar-image(src="https://github.com/radix-vue.png" alt="@radix-vue")
    avatar-fallback
  h1(class="text-2xl font-medium") {{ $t('Welcome') }}
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>