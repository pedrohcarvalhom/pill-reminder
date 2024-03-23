<template>
  <div v-if="pills.length">
    <Card v-for="pill in props.pills" :key="pill.id" class="m-4 rounded-xl md:w-[500px] bg-gray-200 dark:bg-gray-200">
      <div class="flex items-center ml-3">
        <NuxtImg class="w-16 h-16" src="/img/medicine.png" alt="Medicine Icon" />
        <div class="flex-1">
          <CardHeader>
            <CardTitle class="text-2xl dark:text-gray-950">
              {{ pill.name }}, {{ pill.quantity }} {{ pill.measure }}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription>
              <span class="flex gap-2 items-center text-lg text-gray-800 font-medium">
                <Icon class="text-red-500" name="solar:pills-bold-duotone" />
                {{ pill.quantity }} {{ pill.measure }}
              </span>
              <!-- <span class="flex gap-2 items-center text-lg text-gray-800 font-medium">
                <Icon class="text-red-500" name="clarity:clock-solid" />
                {{ pill.hours.map(hour => hour).join(', ') }}
              </span> -->
            </CardDescription>
          </CardContent>
        </div>
      </div>

      <CardFooter>
        <Button variant="outline" class="w-full hover:bg-red-500">{{ $t('buttons.edit') }}</Button>
      </CardFooter>
    </Card>
  </div>

  <div v-else class="mx-4 mt-10">
    <span class="font-semibold">Você ainda não possui remédios cadastrados para hoje. Que tal adicionar algum?</span>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { PillResponse } from '~/types/types';

const props = defineProps({
  pills: {
    type: Array as PropType<PillResponse[]>,
    required: true
  }
})
</script>