<template lang="pug">
div(class="w-full mt-8 py-5 px-2 flex justify-between")
  dates-button(v-for="date in thisWeekDates" :key="date.day" :day="date.day" :week-day="date.weekDay")
</template>

<script setup lang="ts">
type DateItem = {
  day: number;
  weekDay: number;
}

const thisWeekDates = ref(getThisWeekDates());
function getThisWeekDates(): DateItem[] {
  const week= [];
  const current = new Date();
  current.setDate((current.getDate() - current.getDay() +1));

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() +1);
  }
  return week.map((date) => {
    return {
      day: date.getDate(),
      weekDay: date.getDay(),
    }
  })
}
</script>