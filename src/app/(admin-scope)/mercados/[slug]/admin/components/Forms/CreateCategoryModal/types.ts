import type { DefaultFormFields } from '@/constants/forms/default-forms-fields'

export interface CreateCategoryFormInputs
  extends Pick<DefaultFormFields, 'name' | 'description'> {}

export interface CreateCategoryFormData {
  description: string
  name: string
}
