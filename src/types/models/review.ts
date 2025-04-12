import type { Order } from './order'
import type { Product } from './product'

export interface Review {
  comment?: string
  created_at: string
  id: number
  order?: Order
  order_id: number
  product?: Product
  product_id: number
  rating: number
}
