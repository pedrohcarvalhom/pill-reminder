import { Prisma } from "@prisma/client"
import prisma from "../../../client"

export default defineEventHandler(async (event) => {
  const pillId = getRouterParam(event, 'id');
  const body = await readBody(event);

  if (!pillId) {
    throw createError({
      statusCode: 422,
      message: 'Você deve fornecer um ID para o remédio',
    })
  }

  try {
    const pill = await prisma.pill.update({
      where: {
        id: Number(pillId)
      },
      data: {
        hours: {
          push: body.hour
        }
      }
    })

    return { hour: body.hour as string, pillId: pill.id }
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