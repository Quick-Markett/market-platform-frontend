import type { Product } from '@/types/models/product'
import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleOpenRemoveProductModal = ({
  product
}: {
  product: Product
}) => {
  triggerCustomEvent({
    eventName: 'remove-product',
    data: {
      action: 'open',
      data: product
    }
  })
}
