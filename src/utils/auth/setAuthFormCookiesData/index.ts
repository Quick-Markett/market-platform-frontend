'use server'

import { cookies } from 'next/headers'

import type { SetAuthFormCookiesDataProps } from './types'

export const setAuthFormCookiesData = async (
  props: SetAuthFormCookiesDataProps
) => {
  const cookie = await cookies()

  Object.entries(props).forEach(([key, value]) => {
    if (value) {
      cookie.set(key, value)
    }
  })
}
