'use client'

import type { ReadonlyURLSearchParams } from 'next/navigation'

import type { GetAuthFormSearchParamsDataReturn } from './types'

export const getAuthFormSearchParamsData = (
  searchParams: ReadonlyURLSearchParams
): GetAuthFormSearchParamsDataReturn => {
  const searchParamShouldAuthenticate =
    searchParams.get('should_authenticate') === 'true'
  const searchParamRedirectUrl = searchParams.get('auth_redirect')

  return {
    searchParamShouldAuthenticate,
    searchParamRedirectUrl
  }
}
