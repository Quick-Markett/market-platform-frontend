import type { Category } from '@/types/models/category'

export interface GetCategoryByIdPayload {
  categoryId: number
  token: string
}

export interface GetMarketCategoriesPayload {
  token: string
}

export interface CreateCategoryPayload {
  payload: Pick<Category, 'description' | 'name' | 'slug' | 'market_id'>
  token: string
}

export interface UpdateCategoryPayload extends GetCategoryByIdPayload {}

export interface DeleteCategoryPayload extends GetCategoryByIdPayload {}
