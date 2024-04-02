import prisma from "~/server/client";

export default defineEventHandler(async (event) => {
  const pacientId = getRouterParam(event, 'id');

  if (!pacientId) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Você deve fornecer um ID para o paciente',
    })
  }

  try {
    await prisma.hour.deleteMany({
      where: {
        pill: {
          pacientId: Number(pacientId)
        }
      }
    })
    await prisma.pill.deleteMany({
      where: {
        pacientId: Number(pacientId)
      }
    })
    await prisma.pacient.delete({
      where: {
        id: Number(pacientId)
      }
    })

    return {
      success: true
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Não foi possível deletar o paciente',
    })
  }
})