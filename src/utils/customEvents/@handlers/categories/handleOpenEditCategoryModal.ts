import type { Category } from '@/types/models/category'
import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

export const handleOpenEditCategoryModal = ({
  category
}: {
  category: Category
}) => {
  triggerCustomEvent({
    eventName: 'edit-category',
    data: {
      action: 'open',
      data: category
    }
  })
}
