<template lang="pug">
button(
  class="inline-flex flex-col items-center justify-center rounded-3xl p-6 w-10 h-18 lg:w-20 lg:h-28 lg:p-8 lg:mx-1"
  :class="{'bg-red-500': props.isToday, 'bg-gray-200': !props.isToday}"
)
  span(
    class="font-bold text-black text-xl lg:text-3xl"
    :class="{'text-white font-bold': props.isToday, 'text-gray-800': !props.isToday}"
  ) {{ props.day }}
  span(
    class="text-gray-500 text-sm lg:text-lg"
    :class="{'text-white font-bold': props.isToday, 'text-gray-800': !props.isToday}"
  ) {{ parseWeekDay(props.weekDay) }}
</template>

<script setup lang="ts">
import { useI18n } from '#imports';

const { t } = useI18n();
const props = defineProps({
  day: {
    type: Number,
    required: true
  },
  weekDay: {
    type: Number,
    required: true
  },
  isToday: {
    type: Boolean,
    default: false
  }
})

const parseWeekDay = (day: number) => {
  switch (day) {
    case 0:
      return t('dates.sunday')
    case 1:
      return t('dates.monday')
    case 2:
      return t('dates.tuesday')
    case 3:
      return t('dates.wednesday')
    case 4:
      return t('dates.thursday')
    case 5:
      return t('dates.friday')
    case 6:
      return t('dates.saturday')
  }
}
</script>