import { Prisma } from "@prisma/client"
import prisma from "../../client"

export default defineEventHandler(async (event) => {
  const pillId = getRouterParam(event, 'pill_id');
  const body = await readBody<{ hour: string }>(event);

  if (!pillId) {
    throw createError({
      statusCode: 422,
      message: 'Você deve fornecer o ID do remédio',
    })
  }

  if (!body.hour) {
    throw createError({
      statusCode: 422,
      message: 'Não foram fornecidos dados suficientes para criação.',
    })
  }

  try {
    const createdHour = await prisma.hour.create({
      data: {
        time: body.hour,
        checked: false,
        checkedAt: null,
        pillId: Number(pillId)
      }
    })

    return {
      success: true,
      hour: createdHour
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw createError({
          statusCode: 404,
          statusMessage: 'Remédio não encontrado',
        })
      }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Ocorreu um erro ao buscar o remédio. Tente novamente.',
      })
    }
  }
})