/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

import type { GetUserSessionResponse } from './types'

export const getUserSession = async (): Promise<GetUserSessionResponse> => {
  const session = await getServerSession(authOptions)

  return session?.user as GetUserSessionResponse
}
