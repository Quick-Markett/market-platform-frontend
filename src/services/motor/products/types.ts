import type { Product } from '@/types/models/product'

export interface GetProductByIdPayload {
  productId: number
}

export interface CreateProductPayload {
  payload: Pick<
    Product,
    | 'market'
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
  marketId: number
}

export interface UpdateProductByIdPayload extends GetProductByIdPayload {
  token: string
}

export interface DeleteProductByIdPayload extends GetProductByIdPayload {
  token: string
}
