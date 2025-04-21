import type { Market } from '@/types/models/market'

export interface useGetAllCategoriesData {
  payload: Pick<Market, 'slug'>
}
