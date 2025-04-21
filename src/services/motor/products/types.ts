import type { Product } from '@/types/models/product'

export type ProductFilter = keyof Omit<Product, 'id'>

export type ProductFilters = Partial<Record<ProductFilter, string>>

export interface ProductParamsFilters {
  filters?: {
    query?: string
  } & ProductFilters
}

export interface GetProductByIdPayload {
  product_id: number
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
    | 'category_id'
  >
  token: string
}

export interface GetMarketProductsPayload {
  slug: string
}

export interface UpdateProductByIdPayload {
  payload: Pick<
    Product,
    | 'id'
    | 'product_description'
    | 'product_image'
    | 'product_name'
    | 'slug'
    | 'stock'
    | 'unit_price'
    | 'category_id'
  >
  token: string
}

export interface DeleteProductByIdPayload extends GetProductByIdPayload {
  token: string
}
