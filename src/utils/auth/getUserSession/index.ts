/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import type { User } from '@/types/models/user'

export const getUserSession = async (): Promise<User> => {
  const session = await getServerSession(authOptions)

  // @ts-expect-error
  return session?.user.data as User
}
