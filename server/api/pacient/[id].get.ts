import prisma from "../../client"

export default defineEventHandler(async (event) => {
  const pacientId = getRouterParam(event, 'id');
  const query = getQuery(event);
  const email = query.email?.toString();

  if (!email) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Não autorizado',
    })
  }

  const pacient = await prisma.pacient.findFirstOrThrow({
    where: {
      id: Number(pacientId)
    },
    select: {
      id: true,
      name: true,
      description: true
    }
  });

  return {
    pacient
  }
})