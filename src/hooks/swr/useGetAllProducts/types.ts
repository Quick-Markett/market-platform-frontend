import type { ProductParamsFilters } from '@/services/motor/products/types'

export interface useGetAllProductsData extends ProductParamsFilters {
  params?: ProductParamsFilters
  slug: string
}
