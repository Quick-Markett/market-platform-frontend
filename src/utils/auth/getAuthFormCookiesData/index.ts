'use server'

import { cookies } from 'next/headers'

import type { AuthFormCustomSteps } from '@/components/common/AuthForm/types'

import type { GetAuthFormCookiesDataReturn } from './types'

export const getAuthFormCookiesData =
  async (): Promise<GetAuthFormCookiesDataReturn> => {
    const cookie = await cookies()

    const cookiesAuthInitialStep = cookie.get('cookiesAuthInitialStep')
      ?.value as AuthFormCustomSteps
    const cookiesUserEmail = cookie.get('cookiesUserEmail')?.value
    const cookiesGoogleId = cookie.get('cookiesGoogleId')?.value

    return {
      cookiesAuthInitialStep,
      cookiesUserEmail,
      cookiesGoogleId
    }
  }
