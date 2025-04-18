import type { DefaultFormFields } from '@/constants/forms/default-forms-fields'

export interface CreateProductFormInputs
  extends Pick<
    DefaultFormFields,
    'name' | 'description' | 'category_id' | 'price' | 'quantity'
  > {}

export interface CreateProductFormData {
  category_id: number
  description: string
  name: string
  price: number
  quantity: number
}
