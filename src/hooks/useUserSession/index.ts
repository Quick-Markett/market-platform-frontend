'use client'

import type { SessionContextValue } from 'next-auth/react'
import { useSession } from 'next-auth/react'

import type { User } from '@/types/models/user'

export const useUserSession = (): {
  user?: User
  update: SessionContextValue['update']
  token?: string
} => {
  const { data, update } = useSession() ?? {}

  return {
    user: data?.user as User,
    update
  }
}
