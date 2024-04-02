

const updateCheckedHour = async (checked: boolean, hourId: number, pillId: number) => {
  const { success } = await $fetch(`/api/pills/update_hour/${pillId}`, {
    method: 'POST',
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