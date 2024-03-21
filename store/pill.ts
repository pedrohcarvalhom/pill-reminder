import { defineStore } from 'pinia'

interface State {
  pills: Pill[],
}

export const usePillStore = defineStore('pill', {
  state: (): State => {
    return {
      pills: [],
    }
  },
  actions: {
    setPill(pill: Pill) {
      this.pills.push(pill);
    },
    setPills(pills: Pill[]) {
      this.pills = []
      this.pills = [...this.pills, ...pills];
    },
    addNewHourToPill(id: number, hour: string) {
      this.pills.find(pill => pill.id === id)?.hours.push(hour);
    },
    findHoursFromPill(id: number) {
      return this.getHoursFromPill(id)
    }
  },
  getters: {
    getHoursFromPill: (state) => (id: number) => {
      return state.pills.find(pill => pill.id === id)?.hours
    }
  }
})

interface Pill {
  id?: number,
  description?: string,
  name: string,
  quantity: number,
  hours: string[],
  measure: string,
  when?: string,
}