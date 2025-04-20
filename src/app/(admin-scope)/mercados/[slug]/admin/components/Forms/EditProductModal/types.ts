import type { DefaultFormFields } from '@/constants/forms/default-forms-fields'

export interface EditProductFormInputs
  extends Pick<
    DefaultFormFields,
    'name' | 'description' | 'category_id' | 'price' | 'quantity'
  > {}

export interface EditProductFormData {
  category_id: number
  description: string
  name: string
  price: number
  quantity: number
}
