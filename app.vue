<template lang="pug">
nuxt-layout
  div
    NuxtLoadingIndicator(color="red" :height="8")
    NuxtPage
</template>


<script setup lang="ts">
import { useUserStore } from './store/user';

const supabase = useSupabaseClient();
const userStore = useUserStore();
onBeforeMount(async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session || !session.user) {
    navigateTo('/login')
    return
  }

  const username = session.user.user_metadata.full_name || session.user.user_metadata.name

  userStore.setUser({ name: username, email: session.user.email! })
  userStore.setUserAuthorization(session.user.email!, session?.access_token)
})
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>