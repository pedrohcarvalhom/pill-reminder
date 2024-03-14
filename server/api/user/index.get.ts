import prisma from "../../client"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const email = query.email?.toString()

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email não definido',
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Usuário não encontrado',
    })
  }

  setResponseStatus(event, 200)

  return {
    user
  }
})