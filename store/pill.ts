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
    }
  },
})

interface Pill {
  id?: number,
  description?: string,
  name: string,
  quantity: number,
  hours: string[],
  measure: string,
}