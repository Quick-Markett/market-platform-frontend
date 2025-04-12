import type { Order } from '@/types/models/order'

export interface GetOrderByIdPayload {
  orderId: number
}

export interface CreateOrderPayload {
  payload: Pick<
    Order,
    'delivery_address' | 'market_id' | 'status' | 'total_price' | 'user_id'
  >
}

export interface GetUserOrdersPayload {
  userId: number
}

export interface UpdateOrderByIdPayload extends GetOrderByIdPayload {}

export interface DeleteOrderByIdPayload extends GetOrderByIdPayload {}

export interface GetMarketOrdersPayload extends GetOrderByIdPayload {}
