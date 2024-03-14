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

  setResponseStatus(event, 200)

  return {
    user
  }
})