<template>
  <header class="mb-6">
    <HeaderNavigation />
  </header>
  <main class="md:container">
    <CommonsLoadingIndicator v-if="status === 'pending'" />
    <HomeEmptyState v-else-if="!pacients.length" @created="refresh" />
    <div v-else>
      <PacientList :pacients="pacients" @created="refresh" />
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pacients.value = data.pacients.map((pacient: any) => {
      return {
        id: pacient.id,
        name: pacient.name,
        description: pacient.description,
        users: pacient.users,
        pills: pacient.pills
      };
    }) as unknown as PacientResponse[]
  }
});
</script>
