

const updateCheckedHour = async (checked: boolean, hourId: number, pillId: number) => {
  const { success } = await $fetch(`/api/hours/${pillId}`, {
    method: 'PUT',
    body: {
      hourId,
      checked
    },
  })

  return success;
}

export const usePillService = () => {
  return {
    updateCheckedHour
  }
}