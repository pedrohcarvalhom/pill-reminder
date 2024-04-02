import { Prisma } from "@prisma/client"
import prisma from "../../client"

export default defineEventHandler(async (event) => {
  const pillId = getRouterParam(event, 'id')

  if (!pillId) {
    throw createError({
      statusCode: 422,
      message: 'Você deve fornecer um ID para o remédio',
    })
  }

  try {
    const pill = await prisma.pill.findFirstOrThrow({
      where: {
        id: Number(pillId)
      },
      include: {
        hour: {
          select: {
            checked: true,
            id: true,
            checkedAt: true,
            time: true
          }
        }
      }
    })

    return { pill }
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