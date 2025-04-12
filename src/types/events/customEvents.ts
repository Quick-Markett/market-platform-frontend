import type { AuthModalEventData } from '@/utils/customEvents/@handlers/authModal/types'

import type { Category } from '../models/category'

export interface CustomEvents {
  'auth-modal-event': {
    action: 'open' | 'close'
    data?: AuthModalEventData
  }
  'create-category': {
    action: 'open' | 'close'
  }
  'edit-category': {
    action: 'open' | 'close'
    data?: Category
  }
}
