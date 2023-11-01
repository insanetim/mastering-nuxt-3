import type { H3Event } from 'h3'
import { serverSupabaseUser } from '#supabase/server'

// If the user does not exist on the request, throw a 401 error
export default async (event: H3Event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
}
