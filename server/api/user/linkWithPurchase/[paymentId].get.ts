import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const { paymentId } = getRouterParams(event)
  const user = await serverSupabaseUser(event)

  try {
    await prisma.coursePurchase.update({
      where: {
        paymentId
      },
      data: {
        userEmail: user?.email
      }
    })
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error linking course purchase'
    })
  }
})
