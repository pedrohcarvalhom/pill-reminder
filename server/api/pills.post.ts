import prisma from "../client"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email e/ou nome não definido',
    })
  }

  await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    }
  })

  setResponseStatus(event, 200)
})