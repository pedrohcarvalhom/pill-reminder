

const updateCheckedHour = async (checked: boolean, hourId: number) => {
  await $fetch(`/api/hours/${hourId}`, {
    method: 'PUT',
    body: {
      hour: checked
    },
  })
}

export const usePillService = () => {
  return {
    updateCheckedHour
  }
}