<template>
  <header>
    <HeaderNavigation />
  </header>
  <main class="md:container">
    <DatesList />
    <hr class="my-4">
    <div class="flex justify-between items-center">
      <span class="text-2xl ml-4 font-bold"> {{ $t('medicines.toTake') }} </span>
      <Button variant="ghost" class="p-0 mr-6 mt-1 text-red-500 font-bold" @click="isRegisteringPill = true">
        <icon class="w-5 h-5 mr-1" name="ion:add-circle" />
        <span class="text-sm md:text-2xl"> {{ $t('buttons.add') }} </span>
      </Button>
    </div>
    <div class="flex flex-col md:items-center">
      <MedicinesList v-if="status == 'success' && pillStore.pills.length" class="mt-4" />
      <span v-else class="h-[50vh] flex justify-center items-center"> {{ $t('medicines.loading') }}</span>
    </div>
    <PillsCreate v-model="isRegisteringPill" />
  </main>
</template>

<script setup lang="ts">
import { usePillStore } from '~/store/pill';
import { useUserStore } from '~/store/user';

const isRegisteringPill = ref(false)
const { isLoaded, email } = storeToRefs(useUserStore());
const pillStore = usePillStore();
const nuxt = useNuxtApp();

const { status } = await useFetch('/api/pills', {
  method: 'GET',
  query: { email },
  watch: [isLoaded],
  responseType: 'json',
  onResponse: (res) => {
    if (res.error) {
      window.alert(res.error.message)
      return
    }

    const pills = res.response._data.pills;
    pillStore.setPills(pills);
  },
  getCachedData(key) {
    const data = nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];

    if (!data) {
      console.log('No data found in cache for key:', key);
      return
    } else {
      pillStore.pills = data
    }
  },
});

</script>