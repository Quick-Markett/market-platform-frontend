import { triggerCustomEvent } from '@/utils/customEvents/triggerCustomEvent'

import type { AuthModalEventData } from './types'

export const handleOpenAuthModal = (data?: AuthModalEventData) => {
  triggerCustomEvent({
    eventName: 'auth-modal-event',
    data: {
      action: 'open',
      data
    }
  })
}
