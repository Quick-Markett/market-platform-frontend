import type { OrderItem } from '@/types/models/orderItem'

export interface GetOrderItemByIdPayload {
  orderItemId: number
}

export interface CreateOrderItemPayload {
  payload: Pick<
    OrderItem,
    'order_id' | 'product_id' | 'quantity' | 'total_price' | 'unit_price'
  >
}

export interface GetOrderItemsPayload extends GetOrderItemByIdPayload {}

export interface UpdateOrderItemPayload extends GetOrderItemByIdPayload {}

export interface DeleteOrderItemPayload extends GetOrderItemByIdPayload {}
