import { Prisma } from "@prisma/client"
import prisma from "../../client"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email e/ou nome não definido',
    })
  }

  try {
    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      }
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw createError({
          statusCode: 409,
          statusMessage: 'Email ja existe',
        })
      }
    }
    throw error
  }

  setResponseStatus(event, 200)
})