import { Prisma } from "@prisma/client";
import prisma from "../../../client"

export default defineEventHandler(async (event) => {
  const pacientId = getRouterParam(event, 'id');
  const query = getQuery(event);
  const invitedByEmail = query.invitedBy?.toString();
  const currentUserEmail = query.email?.toString();

  if (!invitedByEmail || !currentUserEmail) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Não autorizado',
    })
  }

  try {
    const currentUser = await prisma.user.findUniqueOrThrow({
      where: {
        email: currentUserEmail
      },
      select: {
        id: true
      }
    });
    const pacientToShare = await prisma.pacient.findUniqueOrThrow({
      where: {
        id: Number(pacientId),
      },
      include: {
        users: {
          select: {
            id: true
          }
        }
      }
    });
    const userHaveThisPacient = pacientToShare.users.map((user) => user.id).includes(currentUser.id)
    if (userHaveThisPacient) throw createError({ status: 409, message: 'O paciente ja possui este usuário' })

    await prisma.pacient.update({
      where: {
        id: pacientToShare.id
      },
      data: {
        users: {
          connect: {
            id: currentUser.id
          }
        }
      }
    });

    return {
      pacient: pacientToShare
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw createError({
          statusCode: 401,
          message: 'O usuário que te convidou não existe ou não possui autorização para convidar.',
        })
      }
    }

    if (error instanceof Error) {
      if (error.cause?.status === 409) {
        throw createError({
          statusCode: 409,
          message: 'O usuário que te convidou já possui este paciente cadastrado.',
        })
      }
    }

  }
})
