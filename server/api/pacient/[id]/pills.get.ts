import { Prisma } from "@prisma/client";
import prisma from "../../../client"

export default defineEventHandler(async (event) => {
  const pacientId = getRouterParam(event, 'id');

  try {
    const pacient = await prisma.pacient.findFirstOrThrow({
      where: {
        id: Number(pacientId)
      },
      include: {
        pills: {
          select: {
            id: true,
            description: true,
            name: true,
            measure: true,
            quantity: true,
            when: true,
            hour: {
              select: {
                checked: true,
                id: true,
                checkedAt: true,
                time: true
              }
            }
          }
        }
      }
    });

    return { pacient, pills: pacient.pills }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw createError({
          statusCode: 404,
          message: 'Remédio não encontrado',
        })
      }
    } else {
      throw createError({
        statusCode: 500,
        message: 'Erro interno do servidor',
      })
    }
  }
})