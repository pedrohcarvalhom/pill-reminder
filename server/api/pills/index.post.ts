import { Prisma } from "@prisma/client";
import prisma from "../../client"

interface PillRequest {
  name: string
  quantity: number
  hour: string
  measure: string,
  email: string,
  description?: string,
  when?: number;
  pacient: number;
};

export default defineEventHandler(async (event) => {
  const body: PillRequest = await readBody(event)
  const email = getQuery(event).email?.toString();

  if (!email) {
    throw createError({
      statusCode: 401,
      message: 'Não autorizado',
    })
  }

  try {
    await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    });
    const pill = await prisma.pill.create({
      data: {
        name: body.name,
        quantity: body.quantity,
        measure: body.measure,
        description: body.description,
        when: body.when?.toString(),
        pacient: {
          connect: {
            id: body.pacient
          }
        },
        hour: {
          create: {
            time: body.hour,
            checked: false,
          }
        }
      },
    });

    return { pill }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw createError({
          statusCode: 401,
          message: 'Não autorizado',
        })
      } else {
        throw createError({
          statusCode: 500,
          message: 'Erro interno. Tente novamente',
        })
      }
    }
  }
})
