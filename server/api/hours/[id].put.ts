import { Prisma } from "@prisma/client";
import prisma from "~/server/client";

export default defineEventHandler(async (event) => {
  const hourId = getRouterParam(event, 'id');
  const body = await readBody(event);

  if (!hourId) {
    throw createError({
      statusCode: 422,
      message: 'Você deve fornecer um ID para a hora',
    })
  }

  try {
    const hour = await prisma.hour.update({
      where: {
        id: Number(hourId)
      },
      data: {
        checked: body.checked,
        checkedAt: body.checked ? new Date() : null,
      }
    })

    return hour
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw createError({
          statusCode: 404,
          statusMessage: 'Hora não encontrada',
        })
      }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Ocorreu um erro ao buscar a hora. Tente novamente.',
      })
    }
  }
})