<template>
  <header>
    <header-navigation />
    <main>
      <dates-list />
      <hr />.my-4
      <div class="flex justify-between items-center">
        <span class="text-2xl ml-4 font-bold"> {{ $t('medicines.toTake') }}
          <a class="mr-6 mt-1 text-red-500 font-bold" @click="isRegisteringPill = !isRegisteringPill">
            <icon class="w-5 h-5 mr-1" name="ion:add-circle" />
            <span> {{ $t('buttons.add') }} </span>
          </a>
        </span>
      </div>
      <medicines-list class="mt-4" />
      <pills-create @update:model-value="isRegisteringPill = $event" />
    </main>
  </header>
</template>

<script setup lang="ts">
const isRegisteringPill = ref(false)
</script>