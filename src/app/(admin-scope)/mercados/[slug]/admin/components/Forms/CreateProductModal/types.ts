import type { DefaultFormFields } from '@/constants/forms/default-forms-fields'

export interface CreateProductFormInputs
  extends Pick<DefaultFormFields, 'name' | 'description'> {}

export interface CreateProductFormData {
  category_id: number
  description: string
  name: string
}
