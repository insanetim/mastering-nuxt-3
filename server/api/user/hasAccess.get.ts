import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient()

type User = {
  email: string
}

export default defineEventHandler(async event => {
  const user = (await serverSupabaseUser(event)) as User

  if (!user) {
    return false
  }

  const coursePurchases = await prisma.coursePurchase.findMany({
    where: {
      userEmail: user.email,
      verified: true,
      courseId: 1
    }
  })

  return coursePurchases.length > 0
})
