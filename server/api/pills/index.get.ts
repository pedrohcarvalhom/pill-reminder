import prisma from "../../client"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const email = query.email?.toString()

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email não definido',
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  const pills = await prisma.pill.findMany({
    where: {
      userId: user?.id
    }
  })

  if (pills) {
    setResponseStatus(event, 200)
    return { pills }
  } else {
    setResponseStatus(event, 422, "Remédio não encontrados")
  }

})