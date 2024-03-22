<template>
  <header>
    <HeaderNavigation />
  </header>
  <main class="md:container">
    <DatesList />
    <hr class="my-4">
    <CommonsLoadingIndicator v-if="status === 'pending'" />
    <HomeEmptyState v-else-if="!pacients.length" @created="refresh" />
    <div v-else>
      <PacientList :pacients="pacients" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user';
import type { PacientResponse } from '@/types/types'
import type { CommonsLoadingIndicator } from '#build/components';

const { isLoaded, email } = storeToRefs(useUserStore());
const pacients = ref<PacientResponse[]>([]);

const { status, refresh } = await useFetch('/api/pacient', {
  method: 'GET',
  query: { email },
  watch: [isLoaded],
  responseType: 'json',
  transform(data) {
    pacients.value = data.pacients.map((pacient) => {
      return {
        id: pacient.id,
        name: pacient.name,
        description: pacient.description,
        users: pacient.users
      };
    }) as unknown as PacientResponse[]
  }
});
</script>
