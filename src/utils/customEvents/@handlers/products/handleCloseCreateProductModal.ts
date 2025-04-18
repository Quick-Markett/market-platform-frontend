import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleCloseCreateProductModal = () => {
  triggerCustomEvent({
    eventName: 'create-product',
    data: {
      action: 'close'
    }
  })
}
