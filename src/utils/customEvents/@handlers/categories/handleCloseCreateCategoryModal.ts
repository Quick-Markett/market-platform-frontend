import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleCloseCreateCategoryModal = () => {
  triggerCustomEvent({
    eventName: 'create-category',
    data: {
      action: 'close'
    }
  })
}
