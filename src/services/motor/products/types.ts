import type { Product } from '@/types/models/product'

export type ProductFilter = keyof Omit<Product, 'id'>

export type ProductFilters = Partial<Record<ProductFilter, string>>

export interface ProductParamsFilters {
  filters?: {
    query?: string
  } & ProductFilters
}

export interface GetProductByIdPayload {
  productId: number
}

export interface CreateProductPayload {
  payload: Pick<
    Product,
    | 'slug'
    | 'market_id'
    | 'product_description'
    | 'product_image'
    | 'product_name'
    | 'stock'
    | 'unit_price'
  >
  token: string
}

export interface GetMarketProductsPayload {
  slug: string
}

export interface UpdateProductByIdPayload extends GetProductByIdPayload {
  token: string
}

export interface DeleteProductByIdPayload extends GetProductByIdPayload {
  token: string
}
