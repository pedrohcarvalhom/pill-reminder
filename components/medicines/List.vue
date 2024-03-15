<template>
  <div v-if="pills.length">
    <Card v-for="pill in pills" :key="pill.id" class="m-4 rounded-3xl w-full md:w-[50vw] bg-gray-200 dark:bg-gray-200">
      <div class="flex items-center ml-3">
        <div class="flex-none w-14 h-14 bg-blue-400 rounded-lg">
        </div>
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
              <span class="flex gap-2 items-center text-lg text-gray-800 font-medium">
                <Icon class="text-blue-500" name="clarity:clock-solid" />
                {{ pill.hours.map(hour => hour).join(', ') }}
              </span>
            </CardDescription>
          </CardContent>
        </div>
      </div>

      <CardFooter>
        <Button variant="outline" class="w-full hover:bg-red-500" @click="goToEdit(pill.id!)">{{ $t('buttons.edit')
        }}</Button>
      </CardFooter>
    </Card>
  </div>

  <div v-else class="mx-4 mt-10">
    <span class="font-semibold">Você ainda não possui remédios cadastrados para hoje. Que tal adicionar algum?</span>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { usePillStore } from '~/store/pill';

const { pills } = storeToRefs(usePillStore());
const router = useRouter();
function goToEdit(indexPill: number) {
  router.push(`/pills/${indexPill}`);
}
</script>