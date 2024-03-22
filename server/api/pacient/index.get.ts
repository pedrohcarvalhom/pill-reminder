import prisma from "../../client"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const email = query.email?.toString()

  const pacients = await prisma.pacient.findMany({
    where: {
      users: {
        some: {
          email
        }
      },
    },
    include: {
      users: true,
      pills: true
    }
  });

  return {
    pacients
  }
})