import axios from 'axios'
import useSWR from 'swr'

const fetcher = async ([_, payload]) => {
  const { data } = await axios.get(
    `/api/categories/get-market-categories?slug=${payload.slug}`
  )

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
