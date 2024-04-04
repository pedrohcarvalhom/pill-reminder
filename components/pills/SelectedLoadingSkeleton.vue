<template>
  <div class="w-full h-screen">
    <div class="flex flex-col">
      <skeleton class="h-32 w-32 my-2 rounded-3xl" />
      <div class="mt-8 w-full flex justify-between items-center">
        <div>
          <skeleton class="h-6 w-48" />
          <skeleton class="h-4 w-48 mt-2" />
        </div>
        <div class="flex">
          <skeleton class="h-6 w-6" />
          <skeleton class="h-6 w-6 ml-2" />
        </div>
      </div>
    </div>
    <hr class="my-4">
    <div class="flex mt-10">
      <skeleton class="h-28 w-40 rounded-xl my-2 mr-4" />
      <skeleton class="h-28 w-40 rounded-xl my-2" />
    </div>
    <div class="my-10" />
    <skeleton class="h-4 w-48 mt-2" />
    <skeleton class="h-48 w-full mt-2" />
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>