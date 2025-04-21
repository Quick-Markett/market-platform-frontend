import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleCloseRemoveProductModal = () => {
  triggerCustomEvent({
    eventName: 'remove-product',
    data: {
      action: 'close'
    }
  })
}
