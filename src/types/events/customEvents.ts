import type { AuthModalEventData } from '@/utils/customEvents/@handlers/authModal/types'

import type { Category } from '../models/category'
import type { Product } from '../models/product'

export interface CustomEvents {
  'auth-modal-event': {
    action: 'open' | 'close'
    data?: AuthModalEventData
  }
  'create-category': {
    action: 'open' | 'close'
  }
  'create-product': {
    action: 'open' | 'close'
  }
  'edit-category': {
    action: 'open' | 'close'
    data?: Category
  }
  'edit-product': {
    action: 'open' | 'close'
    data?: Product
  }
  'remove-category': {
    action: 'open' | 'close'
    data?: Category
  }
  'remove-product': {
    action: 'open' | 'close'
    data?: Product
  }
}
