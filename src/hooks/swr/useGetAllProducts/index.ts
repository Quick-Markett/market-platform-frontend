import useSWR from 'swr'

import { instanceMotor } from '@/instances/instanceMotor'
import type { swrHookFetcherParams } from '@/types/swr/swrHookFetcherParams'

import type { useGetAllProductsData } from './types'

const fetcher = async ([
  _,
  payload
]: swrHookFetcherParams<useGetAllProductsData>) => {
  const { data } = await instanceMotor.products.getMarketProducts({
    slug: payload.slug
  })

  return data
}

export const useGetAllProducts = (payload: useGetAllProductsData) => {
  const { data = [], ...rest } = useSWR(['useGetAllProducts', payload], fetcher)

  return {
    allProducts: data,
    ...rest
  }
}
