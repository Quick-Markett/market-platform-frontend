import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleOpenCreateCategoryModal = () => {
  triggerCustomEvent({
    eventName: 'create-category',
    data: {
      action: 'open'
    }
  })
}
