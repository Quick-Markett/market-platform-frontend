import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleCloseRemoveCategoryModal = () => {
  triggerCustomEvent({
    eventName: 'remove-category',
    data: {
      action: 'close'
    }
  })
}
