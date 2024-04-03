import prisma from "~/server/client";

export default defineEventHandler(async (event) => {
  const pillId = getRouterParam(event, 'id');

  if (!pillId) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Você deve fornecer um ID para o remédio',
    })
  }

  try {
    await prisma.hour.deleteMany({
      where: {
        pill: {
          id: Number(pillId)
        }
      }
    })
    await prisma.pill.delete({
      where: {
        id: Number(pillId)
      }
    })

    return {
      success: true
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Não foi possível deletar o remédio',
    })
  }
})