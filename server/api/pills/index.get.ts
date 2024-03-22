import prisma from "../../client"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const email = query.email?.toString()

})