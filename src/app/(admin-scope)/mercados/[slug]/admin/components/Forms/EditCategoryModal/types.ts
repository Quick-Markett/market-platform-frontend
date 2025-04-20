import type { DefaultFormFields } from '@/constants/forms/default-forms-fields'

export interface EditCategoryFormInputs
  extends Pick<DefaultFormFields, 'name' | 'description'> {}

export interface EditCategoryFormData {
  description: string
  name: string
}
