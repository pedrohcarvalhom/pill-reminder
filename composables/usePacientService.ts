

const deletePacient = async (pacientId: number) => {
  return await $fetch(`/api/pacient/${pacientId}`, {
    method: 'DELETE',
  });
}

export const usePacientService = () => {
  return {
    deletePacient,
  }
}