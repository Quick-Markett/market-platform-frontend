'use server'

import { cookies } from 'next/headers'

import { auth } from '@/instances/instanceAuth'
import type { User } from '@/types/models/user'
import { getAuthFormCookiesData } from '@/utils/auth/getAuthFormCookiesData'

export const updateUserSsoAccount = async (user: User) => {
  const cookiesData = await getAuthFormCookiesData()
  const currentCookies = await cookies()

  if (user?.google_id === '0000' && cookiesData.cookiesGoogleId) {
    const { data } = await auth.google.updateUser({
      userId: user.id,
      googleId: cookiesData.cookiesGoogleId
    })

    if (data && data.google_id !== '0000') {
      currentCookies.delete('cookiesGoogleId')
    }
  }
}
