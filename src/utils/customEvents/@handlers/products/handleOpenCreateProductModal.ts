import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleOpenCreateProductModal = () => {
  triggerCustomEvent({
    eventName: 'create-product',
    data: {
      action: 'open'
    }
  })
}
