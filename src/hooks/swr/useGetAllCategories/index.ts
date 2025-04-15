import useSWR from 'swr'

import { instanceMotor } from '@/instances/instanceMotor'

const fetcher = async ([_, payload]) => {
  const { data } = await instanceMotor.categories.getMarketCategories({
    token: payload.token
  })

  return data
}

export const useGetAllCategories = ({ payload }) => {
  const { data = [], ...rest } = useSWR(
    ['useGetAllCategories', payload],
    fetcher
  )

  return {
    allCategories: data,
    ...rest
  }
}
