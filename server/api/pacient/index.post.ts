import { Prisma } from "@prisma/client"
import prisma from "../../client"

interface PacientRequest {
  name: string
  description: string
}

export default defineEventHandler(async (event) => {
  const body: PacientRequest = await readBody(event)
  const query = getQuery(event)
  const email = query.email?.toString();

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: email
      }
    });
    const pacient = await prisma.pacient.create({
      data: {
        name: body.name,
        description: body.description,
        users: {
          connect: {
            id: user.id
          },
        }
      }
    });

    return pacient;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw createError({
          statusCode: 404,
          message: 'Usuário não encontrado',
        })
      }
    }

    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        message: error.message
      })
    }
  }
})