<template lang="pug">
div(class="max-w-96 lg:max-w-[1070px] mx-auto mt-8 py-5 pr-2 flex justify-between")
  dates-button(v-for="date in thisWeekDates" :key="date.day" :is-today="isToday(date)" :day="date.day" :week-day="date.weekDay")
</template>

<script setup lang="ts">
type DateItem = {
  day: number;
  weekDay: number;
}

const thisWeekDates = ref(getThisWeekDates());
function getThisWeekDates(): DateItem[] {
  const week = [];
  const current = new Date();

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return week.map((date) => {
    return {
      day: date.getDate(),
      weekDay: date.getDay(),
    }
  })
}

function isToday(current: DateItem) {
  return current.day === new Date().getDate()
}
</script>