import { Prisma } from "@prisma/client"
import prisma from "../../client"

interface PillRequest {
  name: string;
  description: string;
}

export default defineEventHandler(async (event) => {
  const pillId = getRouterParam(event, 'id')
  const body = await readBody<PillRequest>(event)

  if (!pillId || !body.name || !body.description) {
    throw createError({
      statusCode: 422,
      message: 'Não foram fornecidos dados suficientes para atualização.',
    })
  }

  try {
    await prisma.pill.findFirstOrThrow({
      where: {
        id: Number(pillId)
      }
    });
    await prisma.pill.update({
      where: {
        id: Number(pillId)
      },
      data: {
        name: body.name,
        description: body.description
      }
    })

    return {
      success: true
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw createError({
          statusCode: 404,
          message: 'Remédio não encontrado',
        })
      }
    }
    throw createError({
      statusCode: 500,
      message: 'Ocorreu um erro ao atualizar o remédio. Tente novamente',
    })
  }
})