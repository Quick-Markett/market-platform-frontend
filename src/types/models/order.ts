import type { Market } from './market'
import type { OrderItem } from './orderItem'
import type { User } from './user'

export interface Order {
  created_at: string
  delivery_address: string
  id: number
  market?: Market
  market_id: number
  orderItems?: OrderItem[]
  status: string
  total_price: number
  updated_at: string
  user?: User
  user_id: number
}
