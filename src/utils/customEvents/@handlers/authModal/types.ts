import type { AuthFormCustomSteps } from '@/components/common/AuthForm/types'
import type { Category } from '@/types/models/category'

export interface AuthModalEventData {
  initialStep: AuthFormCustomSteps
  redirectUrl?: string
}

export interface HandleOpenEditCategoryModalProps {
  category: Category
}
