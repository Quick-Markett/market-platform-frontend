import type { Product } from '@/types/models/product'
import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleOpenEditProductModal = ({
  product
}: {
  product: Product
}) => {
  triggerCustomEvent({
    eventName: 'edit-product',
    data: {
      action: 'open',
      data: product
    }
  })
}
