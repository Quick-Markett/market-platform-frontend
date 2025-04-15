import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleCloseEditProductModal = () => {
  triggerCustomEvent({
    eventName: 'edit-product',
    data: {
      action: 'close'
    }
  })
}
