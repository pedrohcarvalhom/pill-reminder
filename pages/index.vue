<template>
  <header>
    <HeaderNavigation />
  </header>
  <main class="md:container">
    <DatesList />
    <hr class="my-4">
    <HomeEmptyState v-if="!pacients.length && isLoaded" @created="refresh" />
    <div v-else>
      <PacientList :pacients="pacients" />
      <!-- <div class="flex justify-between items-center">
        <span class="text-2xl ml-4 font-bold"> {{ $t('medicines.toTake') }} </span>
        <Button variant="ghost" class="p-0 mr-6 mt-1 text-red-500 font-bold">
          <icon class="w-5 h-5 mr-1" name="ion:add-circle" />
          <span class="text-sm md:text-2xl"> {{ $t('buttons.add') }} </span>
        </Button>
      </div> -->
      <!-- <div class="flex flex-col md:items-center">
        <MedicinesList v-if="status == 'success'" class="mt-4" />
        <span v-else class="h-[50vh] flex justify-center items-center"> {{ $t('medicines.loading') }}</span>
      </div> -->
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user';
import type { PacientResponse } from '@/types/types'

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