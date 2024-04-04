import { Prisma } from "@prisma/client"
import prisma from "../../client"

export default defineEventHandler(async (event) => {
  const pillId = Number(getRouterParam(event, 'id'))

  if (!pillId) {
    throw createError({
      statusCode: 422,
      message: 'Você deve fornecer um ID para o remédio',
    })
  }

  try {
    await clearHourConfirmation(pillId);
    const pill = await prisma.pill.findFirstOrThrow({
      where: {
        id: pillId
      },
      include: {
        hour: {
          select: {
            checked: true,
            id: true,
            checkedAt: true,
            time: true
          }
        }
      }
    })

    return { pill }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw createError({
          statusCode: 404,
          statusMessage: 'Remédio não encontrado',
        })
      }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Ocorreu um erro ao buscar o remédio. Tente novamente.',
      })
    }
  }
})

async function clearHourConfirmation(pillId: number) {
  const { today, yesterday } = getTodayAndYesterday();

  const hours = await prisma.hour.findMany({
    where: {
      pillId,
      checked: true,
      checkedAt: {
        gte: new Date(yesterday),
        lt: new Date(today)
      }
    }
  });

  if (!hours.length) return;

  await prisma.hour.updateMany({
    where: {
      pillId,
      checked: true,
      checkedAt: {
        gte: yesterday,
        lt: today
      }
    },
    data: {
      checked: false,
      checkedAt: null
    }
  });
}

function getTodayAndYesterday() {
  const today = new Date().toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  const todayDate = new Date(today);
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  return {
    today,
    yesterday
  }
}