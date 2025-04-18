import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleCloseEditCategoryModal = () => {
  triggerCustomEvent({
    eventName: 'edit-category',
    data: {
      action: 'close'
    }
  })
}
