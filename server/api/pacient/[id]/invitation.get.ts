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
    await prisma.user.findUniqueOrThrow({
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
        users: {
          some: {
            email: invitedByEmail
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
    } else {
      throw createError({
        statusCode: 500,
        message: 'Erro interno do servidor',
      })
    }
  }
})