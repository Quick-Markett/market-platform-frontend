import type { Order } from '@/types/models/order'

export interface GetOrderByIdPayload {
  orderId: number
  token: string
}

export interface CreateOrderPayload {
  payload: Pick<
    Order,
    'delivery_address' | 'market_id' | 'status' | 'total_price' | 'user_id'
  >
  token: string
}

export interface GetUserOrdersPayload {
  token: string
  userId: number
}

export interface UpdateOrderByIdPayload extends GetOrderByIdPayload {}

export interface DeleteOrderByIdPayload extends GetOrderByIdPayload {}

export interface GetMarketOrdersPayload extends GetOrderByIdPayload {}
