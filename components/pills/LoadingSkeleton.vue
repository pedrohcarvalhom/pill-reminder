<template>
  <div class="w-full h-screen">
    <div class="flex justify-between items-center">
      <div>
        <skeleton class="h-4 w-48 my-2" />
        <skeleton class="h-4 w-48" />
      </div>
      <div class="flex items-center gap-4">
        <skeleton class="h-10 w-10 my-2" />
        <skeleton class="h-10 w-10" />
      </div>
    </div>
    <hr class="my-4">
    <div
      v-for="i in 10"
      :key="i"
    >
      <div class="flex justify-between items-center w-[250px] h-[150px] p-2 my-1 border border-slate-200 rounded-xl">
        <div class="flex items-center gap-4">
          <skeleton class="h-10 w-10 rounded-full" />
          <div>
            <skeleton class="h-4 w-40 my-2" />
            <skeleton class="h-4 w-40" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>