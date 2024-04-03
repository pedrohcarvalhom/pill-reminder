

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

const updatePillInfo = async (name: string, description: string, pillId: number) => {
  if (!name || !description) return;
  if (name.length < 3 || description.length < 3) return;

  return await $fetch(`/api/pills/${pillId}`, {
    method: 'PUT',
    body: {
      name,
      description
    },
  })
}

const deletePill = async (pillId: number) => {
  return await $fetch(`/api/pills/${pillId}`, {
    method: 'DELETE',
  });
}

export const usePillService = () => {
  return {
    updateCheckedHour,
    updatePillInfo,
    deletePill
  }
}