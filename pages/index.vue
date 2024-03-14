<template>
  <header>
    <HeaderNavigation />
  </header>
  <main>
    <DatesList />
    <hr class="my-4">
    <div class="flex justify-between items-center">
      <span class="text-2xl ml-4 font-bold"> {{ $t('medicines.toTake') }} </span>
      <Button variant="ghost" class="mr-6 mt-1 text-red-500 font-bold" @click="isRegisteringPill = true">
        <icon class="w-5 h-5 mr-1" name="ion:add-circle" />
        <span class="text-sm"> {{ $t('buttons.add') }} </span>
      </Button>
    </div>
    <MedicinesList class="mt-4" />
    <PillsCreate v-model="isRegisteringPill" />
  </main>
</template>

<script setup lang="ts">
const isRegisteringPill = ref(false)
</script>