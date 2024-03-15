import prisma from "../../client"

interface PillRequest {
  name: string
  quantity: number
  hour: string
  measure: string,
  email: string,
  description?: string,
  when?: number
}
export default defineEventHandler(async (event) => {
  const body: PillRequest = await readBody(event)

  if (!body.email) {
    throw createError({
      statusCode: 401,
      message: 'Não autorizado',
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })

  if (!user) {
    throw createError({
      statusCode: 402,
      message: 'Usuário não encontrado',
    })
  }

  const pill = await prisma.pill.create({
    data: {
      name: body.name,
      quantity: body.quantity,
      measure: body.measure,
      hours: [body.hour],
      userId: user.id,
      description: body.description,
      when: body.when?.toString()
    }
  })

  if (pill) {
    setResponseStatus(event, 200)
    return { pill }
  } else {
    setResponseStatus(event, 422)
  }
})
