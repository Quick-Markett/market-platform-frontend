import type { Product } from './product'

export interface OrderItem {
  id: number
  order_id: number
  product?: Product
  product_id: number
  quantity: number
  total_price: number
  unit_price: number
}
