<template>
  <Card
    v-for="pill in props.pills"
    :key="pill.id"
    class="rounded-xl shadow-sm my-6 hover:shadow-lg bg-slate-50 border-slate-300 w-full sm:w-[400px] transition-all duration-300"
  >
    <div class="flex items-center ml-3">
      <img class="w-16 h-16" src="/img/medicine.png" alt="Medicine Icon">
      <div class="flex-1">
        <CardHeader>
          <CardTitle class="text-2xl dark:text-gray-950">
            {{ pill.name }}
          </CardTitle>
          <span class="text-sm font-normal text-slate-600">{{ pill.description }}</span>
        </CardHeader>

        <CardContent>
          <CardDescription>
            <span class="flex gap-2 items-center text-lg text-gray-800 font-medium">
              <Icon
                class="text-red-500"
                name="solar:pills-bold-duotone"
              />
              {{ pill.quantity }} {{ translateMeasure(pill.measure) }}
            </span>
            <span class="flex gap-2 items-center text-lg text-gray-800 font-medium">
              <Icon
                class="text-red-500"
                name="clarity:clock-solid"
              />
              {{ pill.hours.map(hour => hour.time).join(', ') }}
            </span>
          </CardDescription>
        </CardContent>
      </div>
    </div>

    <CardFooter class="flex gap-2">
      <Button variant="outline" class="w-full hover:bg-green-500 hover:text-white" @click="redirectToPill(pill.id)">
        {{ $t('buttons.edit') }}
      </Button>
      <Button variant="outline" class="w-full hover:bg-red-500 hover:text-white" @click="onDeleteClicked(Number(pill.id))">
        {{ $t('buttons.remove') }}
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { type PillResponse, MeasureEnum } from '~/types/types';

const props = defineProps({
  pills: {
    type: Array as PropType<PillResponse[]>,
    required: true
  }
});
const { deletePill } = usePillService();

function redirectToPill(id: string) {
  navigateTo(`/pills/${id}`);
}

function translateMeasure(measure: string): string {
  return MeasureEnum[measure as keyof typeof MeasureEnum];
}

async function onDeleteClicked(pillId: number) {
  try {
    await deletePill(pillId);
    window.alert('Remedio deletado com sucesso!');
    emit('on-deleted');
  } catch (error) {
    console.error(error);
    window.alert("Ocorreu um erro ao deletar o remédio. Tente novamente");
  }
}

const emit = defineEmits(['on-deleted']);
</script>