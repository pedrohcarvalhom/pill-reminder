<template>
  <div class="shadcn-date-picker">
    <div class="header">
      <span class="month">{{ month }}</span>
      <span class="year">{{ year }}</span>
    </div>
    <div class="calendar-grid">
      <div v-for="day in daysOfWeek" :key="day" class="day-of-week">
        {{ day }}
      </div>
      <div v-for="day in days" :key="day.id" class="day" :class="{ today: day.isToday }">
        {{ day.number }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Data inicial
    initialDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      // Mês atual
      month: this.initialDate.toLocaleString('pt-BR', { month: 'long' }),
      // Ano atual
      year: this.initialDate.getFullYear(),
      // Dias da semana
      daysOfWeek: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
      // Lista de dias do mês
      days: this.getDaysInMonth(this.initialDate)
    }
  },
  methods: {
    // Obter os dias do mês
    getDaysInMonth(date) {
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          id: i,
          number: i,
          isToday: i === date.getDate()
        });
      }
      return days;
    }
  }
};
</script>

<style>
.shadcn-date-picker {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.month,
.year {
  font-size: 16px;
  font-weight: bold;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 4px;
}

.day-of-week,
.day {
  text-align: center;
  padding: 4px;
}

.day-of-week {
  font-size: 12px;
  font-weight: bold;
  color: #999;
}

.day {
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
}

.today {
  background-color: #ddd;
}
</style>
