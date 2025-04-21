import type { Category } from '@/types/models/category'
import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleOpenRemoveCategoryModal = ({
  category
}: {
  category: Category
}) => {
  triggerCustomEvent({
    eventName: 'remove-category',
    data: {
      action: 'open',
      data: category
    }
  })
}
