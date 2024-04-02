import { Prisma } from "@prisma/client"
import prisma from "../../../client"

export default defineEventHandler(async (event) => {
  const pillId = getRouterParam(event, 'pill_id');
  const body = await readBody<{ hourId: number, checked: boolean }>(event);

  if (!pillId) {
    throw createError({
      statusCode: 422,
      message: 'Você deve fornecer um ID para o remédio',
    })
  }

  if (!body.hourId) {
    throw createError({
      statusCode: 422,
      message: 'Não foram fornecidos dados suficientes para atualização.',
    })
  }

  try {
    await prisma.hour.update({
      where: {
        id: body.hourId,
      },
      data: {
        checked: body.checked,
        checkedAt: body.checked ? new Date() : null,
      }
    });

    return {
      success: true,
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