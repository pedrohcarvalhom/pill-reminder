<template>
  <Card v-if="false" class="mx-4 rounded-3xl bg-gray-200 dark:bg-gray-200">
    <div class="flex items-center ml-3">
      <div class="flex-none w-14 h-14 bg-blue-400 rounded-lg">
      </div>
      <div class="flex-1">
        <CardHeader>
          <CardTitle class="text-2xl dark:text-gray-950">
            {{ medicine.name }}, {{ medicine.amount }} {{ medicine.measure }}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription>
            <span class="flex gap-2 items-center text-lg text-gray-800 font-medium">
              <Icon name="solar:pills-bold-duotone" />
              {{ medicine.quantity }}, {{ medicine.when }}
            </span>
            <span class="flex gap-2 items-center text-lg text-gray-800 font-medium">
              <Icon name="clarity:clock-solid" />
              {{ medicine.time }}
            </span>
          </CardDescription>
        </CardContent>
      </div>
    </div>

    <CardFooter>
      <Button variant="outline" class="w-full hover:bg-red-500" @click="goToEdit">{{ $t('buttons.edit') }}</Button>
    </CardFooter>
  </Card>

  <div v-else class="mx-4 mt-10">
    <span class="font-semibold">Você ainda não possui remédios cadastrados para hoje. Que tal adicionar algum?</span>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const router = useRouter();
const medicine = ref({
  name: "Dipirona",
  amount: 10,
  quantity: 2,
  when: "at lunch",
  time: "12:00 AM",
  measure: "mg"
})

function goToEdit() {
  router.push('/pills/1')
}
</script>